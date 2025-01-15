import { ReactNode } from 'react';
import styles from "../global.module.css";
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

interface ButtonGroupProps extends Partial<ComponentProps> {
    children: ReactNode;
    vertical?: boolean;
}

/** A grouping component that renders a styled div with centered buttons and optional vertical layout. */
export function ButtonGroup({ vertical, children, ...rest }: ButtonGroupProps) {
    return (
        <div className={styles.buttonGroup} style={{ flexDirection: vertical ? 'column' : 'row', ...applyDefaultStyle(rest) }}>
            {children}
        </div>
    );
}