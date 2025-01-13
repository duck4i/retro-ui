import '../global.css';

interface RetroButtonProps {
    label: string;
    onClick: () => void;
}

export const RetroButton = ({ label, onClick }: RetroButtonProps) => {
    return (
        <button className={"retro-button"} onClick={onClick}>
            {label}
        </button>
    );
};

