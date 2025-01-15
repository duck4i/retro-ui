import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

interface ButtonProps extends Partial<ComponentProps> {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

/** A simple button component */
export const Button = ({ label, disabled, onClick, ...rest }: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick} style={applyDefaultStyle(rest)} disabled={disabled}>
            {label}
        </button>
    );
};
