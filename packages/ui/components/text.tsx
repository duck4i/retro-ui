import '../global.css';

interface RetroTextProps {
    label: string;
    bold?: boolean;
    blink?: boolean;
    inverse?: boolean;
}

export const RetroText = ({ label, bold, blink, inverse }: RetroTextProps) => {
    return (
        <div className={`retro-text ${bold ? 'retro-text-bold' : ''} ${blink ? 'retro-text-blink' : ''} ${inverse ? 'retro-text-inverse' : ''}`}>
            <p>{label}</p>
        </div>
    );
};

