import '../global.css';

interface RetroTextProps {
    label: string;
    bold?: boolean;
    blink?: boolean;
    inverse?: boolean;
}

export const RetroText = ({ label, bold, blink, inverse }: RetroTextProps) => {
    return (
        <p className={`retroText ${bold ? 'retroTextBold' : ''} ${blink ? 'retroTextBlink' : ''} ${inverse ? 'retroTextInverse' : ''}`}>
            {label}
        </p>
    );
};

