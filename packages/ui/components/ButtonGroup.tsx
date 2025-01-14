
import { ReactNode } from 'react';

interface ButtonGroupProps {
    children: ReactNode;
    vertical?: boolean;
}

/** A grouping component that renders a styled div with centered buttons and optional vertical layout. */
export function ButtonGroup({ vertical, children }: ButtonGroupProps) {
    return (
        <div className="retro-button-group" style={{ flexDirection: vertical ? 'column' : 'row' }}>
            {children}
        </div>
    );
}