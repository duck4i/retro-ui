import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import "../global.css";

interface WindowContextType {
    topZIndex: number;
    bringToFront: () => number;
}

const RetroWindowContext = createContext<WindowContextType | null>(null);

export function RetroWindowProvider({ children }: { children: React.ReactNode }) {
    const [topZIndex, setTopZIndex] = useState(1000);

    const bringToFront = () => {
        setTopZIndex(prev => prev + 1);
        return topZIndex + 1;
    };

    return (
        <RetroWindowContext.Provider value={{ topZIndex, bringToFront }}>
            {children}
        </RetroWindowContext.Provider>
    );
}

interface DraggableWindowProps {
    title: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    onClose: () => void;
    children?: React.ReactNode;
}

export function RetroWindow({ title, children, x, y, width, height, onClose }: DraggableWindowProps) {

    const context = useContext(RetroWindowContext);
    if (!context) {
        console.warn("WindowProvider not found. The z-order of windows may not work correctly.");
    }

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: x ?? 0, y: y ?? 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [z, setZ] = useState(1000);
    const windowRef = useRef<HTMLDivElement>(null);

    const updateZIndex = () => {
        const newZ = context?.bringToFront();
        if (newZ) {
            setZ(newZ);
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        updateZIndex();
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const parent = (e.target as HTMLElement).closest('.retro-app');
            if (parent && windowRef.current) {
                const parentRect = parent.getBoundingClientRect();
                const windowRect = windowRef.current.getBoundingClientRect();
                const newX = e.clientX - offset.x;
                const newY = e.clientY - offset.y;

                const constrainedX = Math.max(0, Math.min(newX, parentRect.width - windowRect.width));
                const constrainedY = Math.max(0, Math.min(newY, parentRect.height - windowRect.height));

                setPosition({
                    x: constrainedX,
                    y: constrainedY,
                });
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);

    return (
        <div
            ref={windowRef}
            className="retro-draggable-window"
            onClick={updateZIndex}
            style={
                {
                    top: `${position.y}px`, left: `${position.x}px`,
                    width: width, height: height,
                    zIndex: z
                }}
        >
            <div className="title-bar" onMouseDown={handleMouseDown}>
                <span>{title}</span>
                <button onClick={onClose}>X</button>
            </div>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
}