import '../global.css';

interface TextProps {
    label: string;
    bold?: boolean;
    blink?: boolean;
    inverse?: boolean;
}

/** A simple label component with bold, blink and inverse decorators */
export const Text = ({ label, bold, blink, inverse }: TextProps) => {
    return (
        <div className={`retro-text ${bold ? 'retro-text-bold' : ''} ${blink ? 'retro-text-blink' : ''} ${inverse ? 'retro-text-inverse' : ''}`}>
            <p>{label}</p>
        </div>
    );
};

