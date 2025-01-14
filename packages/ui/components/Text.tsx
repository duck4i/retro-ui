import styles from '../global.module.css';

interface TextProps {
    label: string;
    bold?: boolean;
    blink?: boolean;
    inverse?: boolean;
}

/** A simple label component with bold, blink and inverse decorators */
export const Text = ({ label, bold, blink, inverse }: TextProps) => {
    return (
        <div className={[
            styles.text,
            bold ? styles.textBold : '',
            blink ? styles.textBlink : '',
            inverse ? styles.textInverse : ''
        ].join(' ')
        }>
            <p>{label}</p>
        </div>
    );
};

