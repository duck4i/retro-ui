import { ReactNode } from 'react';
import styles from "../global.module.css"

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
        <div className={[styles.box, type === "inset" ? styles.boxInset : styles.boxBorder].join(' ')}
            style={{ flexDirection: vertical ? 'column' : 'row', padding: padding }}>
            {children}
        </div>
    );
}