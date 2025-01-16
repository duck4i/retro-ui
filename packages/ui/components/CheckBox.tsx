import { useState } from 'react';
import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

interface CheckBoxProps extends Partial<ComponentProps> {
    label: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}

/** A simple checkbox component */
export const CheckBox = ({ label, checked, onChange, disabled, ...rest }: CheckBoxProps) => {
    const [checkedState, setCheckedState] = useState(checked);

    return (
        <label className={styles.checkboxLabel} style={applyDefaultStyle(rest)}>
            <input
                type="checkbox"
                checked={checkedState}
                onChange={(e) => {
                    setCheckedState(e.target.checked);
                    onChange?.call(this, e.target.checked)
                }}
                disabled={disabled}
                className={styles.checkbox}
                style={applyDefaultStyle(rest)}
            />
            {label}
        </label>
    );
};
