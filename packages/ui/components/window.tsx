import React, { useState, useRef, useEffect } from 'react';
import "../global.css";

interface DraggableWindowProps {
    title: string;
    width?: number;
    height?: number;
    onClose: () => void;
    children?: React.ReactNode;
}

export function RetroWindow({ title, onClose, children, width, height }: DraggableWindowProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const parent = (e.target as HTMLElement).closest('.app');
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
            className="draggable-window"
            style={{ top: `${position.y}px`, left: `${position.x}px`, width: width, height: height }}
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