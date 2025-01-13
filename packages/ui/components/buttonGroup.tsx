
import { ReactNode } from 'react';

interface ButtonGroupProps {
    children: ReactNode;
    vertical?: boolean;
}

export function RetroButtonGroup({ vertical, children }: ButtonGroupProps) {
    return (
        <div className="retro-button-group" style={{ flexDirection: vertical ? 'column' : 'row' }}>
            {children}
        </div>
    );
}