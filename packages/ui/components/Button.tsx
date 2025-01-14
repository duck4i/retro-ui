import '../global.css';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

/** A simple button component */
export const Button = ({ label, disabled, onClick }: ButtonProps) => {
    return (
        <button className={"retro-button"} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};
