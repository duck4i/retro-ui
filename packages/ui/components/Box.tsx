
import { ReactNode } from 'react';

export interface BoxProps {
    children: ReactNode;
    type?: 'inset' | 'border';
    vertical?: boolean;
    padding?: number;
}

/**
 * A Box component that renders a styled div with optional inset or border styles.
 * Used for grouping components together.
 */
export function Box({ type = "border", vertical = false, padding = 5, children }: BoxProps) {
    return (
        <div className={`retro-box ${type === "inset" ? "retro-box-inset" : "retro-box-border"}`}
            style={{ flexDirection: vertical ? 'column' : 'row', padding: padding }}>
            {children}
        </div>
    );
}