import { useState, useRef, useEffect } from 'react';
import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

interface DropdownProps extends Partial<ComponentProps> {
    options: string[];
    selectedOption: number;
    onChange?: (selected: number) => void;
    disabled?: boolean;
}

/** A custom dropdown component with proper hover styles */
export const Dropdown = ({ options, selectedOption, onChange, disabled, ...rest }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle clicking outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (index: number) => {
        onChange?.(index);
        setIsOpen(false);
    };

    return (
        <div 
            ref={dropdownRef}
            className={`${styles.dropdown} ${disabled ? styles.disabled : ''}`}
            style={applyDefaultStyle(rest)}
        >
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={styles.dropdownButton}
                disabled={disabled}
            >
                {options[selectedOption]}
            </button>

            {isOpen && !disabled && (
                <div className={styles.dropdownContent}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`${styles.option} ${selectedOption === index ? styles.selected : ''}`}
                            onClick={() => handleSelect(index)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};