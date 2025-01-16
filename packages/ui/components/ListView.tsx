import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

interface ListViewProps extends Partial<ComponentProps> {
    items: string[];
    selectedIndex?: number;
    onSelect?: (index: number) => void;
    disabled?: boolean;
}

/** A retro-styled list view component */
export const ListView = ({ items, selectedIndex, onSelect, disabled, ...rest }: ListViewProps) => {
    return (
        <div 
            className={`${styles.listView} ${disabled ? styles.disabled : ''}`}
            style={applyDefaultStyle(rest)}
        >
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.listItem} ${selectedIndex === index ? styles.selected : ''}`}
                    onClick={() => !disabled && onSelect?.(index)}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};