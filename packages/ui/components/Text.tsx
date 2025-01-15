import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

interface TextProps extends Partial<ComponentProps> {
    label: string;
    bold?: boolean;
    blink?: boolean;
}

/** A simple label component with bold, blink and inverse decorators */
export const Text = ({ label, bold, blink, ...rest }: TextProps) => {
    return (
        <div className={[
            styles.text,
            bold ? styles.textBold : '',
            blink ? styles.textBlink : '',
        ].join(' ')}
            style={{
                ...applyDefaultStyle(rest)
            }}
        >
            <p>{label}</p>
        </div>
    );
};
