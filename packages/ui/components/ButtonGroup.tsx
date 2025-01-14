import { ReactNode } from 'react';
import styles from "../global.module.css";

interface ButtonGroupProps {
    children: ReactNode;
    vertical?: boolean;
}

/** A grouping component that renders a styled div with centered buttons and optional vertical layout. */
export function ButtonGroup({ vertical, children }: ButtonGroupProps) {
    return (
        <div className={styles.buttonGroup} style={{ flexDirection: vertical ? 'column' : 'row' }}>
            {children}
        </div>
    );
}