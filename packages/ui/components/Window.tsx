import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from 'react';
import { WindowContext } from './WindowProvider';
import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

export interface WindowProps extends Omit<Partial<ComponentProps>, 'margin'> {
    title: string;
    x?: number;
    y?: number;
    location?: "coordinate" | "center";
    onClose: () => void;
    children?: React.ReactNode;
}

/**
 * A draggable window component with retro feel
 */
export function Window({ title, children, x, y, onClose, location = "coordinate", ...rest }: WindowProps) {

    const context = useContext(WindowContext);
    if (!context) {
        console.warn("WindowProvider not found. The z-order of windows may not work correctly.");
    }

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: x ?? 0, y: y ?? 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [z, setZ] = useState(1000);
    const windowRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (windowRef.current && location === "center") {
            const rect = windowRef.current.getBoundingClientRect();
            const parent = windowRef.current.closest("#retro-app-root");
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const centeredX = (parentRect.width - rect.width) / 2;
                const centeredY = (parentRect.height - rect.height) / 2;
                setPosition({ x: centeredX, y: centeredY });
            }
        }
    }, []);

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

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setOffset({
            x: touch.clientX - position.x,
            y: touch.clientY - position.y,
        });
        updateZIndex();
    };
    const handleMove = (clientX: number, clientY: number) => {
        if (isDragging) {
            const parent = windowRef?.current?.closest("#retro-app-root");
            if (parent && windowRef.current) {
                const parentRect = parent.getBoundingClientRect();
                const windowRect = windowRef.current.getBoundingClientRect();
                const newX = clientX - offset.x;
                const newY = clientY - offset.y;

                const constrainedX = Math.max(0, Math.min(newX, parentRect.width - windowRect.width));
                const constrainedY = Math.max(0, Math.min(newY, parentRect.height - windowRect.height));

                setPosition({
                    x: constrainedX,
                    y: constrainedY,
                });
            }
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, offset]);

    return (
        <div
            ref={windowRef}
            className={styles.window}
            onClick={updateZIndex}
            style={
                {
                    top: `${position.y}px`, left: `${position.x}px`,
                    zIndex: z,
                    ...applyDefaultStyle(rest),
                }}
        >
            <div className={styles.titleBar} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
                <span>{title}</span>
                <button onClick={onClose}>X</button>
            </div>
            <div className={styles.windowContent}>
                {children}
            </div>
        </div>
    );
}