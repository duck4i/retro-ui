import '../global.css';

interface RetroButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export const RetroButton = ({ label, disabled, onClick }: RetroButtonProps) => {
    return (
        <button className={"retro-button"} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

