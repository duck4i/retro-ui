
import { ReactNode } from 'react';

interface BoxProps {
    children: ReactNode;
    type?: 'inset' | 'border';
    vertical?: boolean;
    padding?: number;
}

export function RetroBox({ type, vertical, padding = 5, children }: BoxProps) {
    return (
        <div className={`retro-box ${type === "inset" ? "retro-box-inset" : "retro-box-border"}`}
            style={{ flexDirection: vertical ? 'column' : 'row', padding: padding }}>
            {children}
        </div>
    );
}