import '../global.css';

interface RetroButtonProps {
    label: string;
    onClick: () => void;
}

export const RetroButton = ({ label, onClick }: RetroButtonProps) => {
    return (
        <button className={"retroButton"} onClick={onClick}>
            {label}
        </button>
    );
};

