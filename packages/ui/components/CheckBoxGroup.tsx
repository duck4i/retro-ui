import { useState } from "react";
import { CheckBox } from "./CheckBox";
import { applyDefaultStyle, ComponentProps } from "../utils/ComponentProps";
import classes from "../global.module.css";

interface CheckBoxGroupProps extends Partial<ComponentProps> {
    options: { label: string; checked: boolean; disabled?: boolean }[];
    onChange?: (options: { label: string; checked: boolean }[]) => void;
    vertical?: boolean;
    toggle?: boolean;
}

/** A group of checkbox components with optional toggle mode */
export const CheckBoxGroup = ({ options, vertical, toggle, onChange, ...rest }: CheckBoxGroupProps) => {
    const [groupState, setGroupState] = useState(options);

    const handleChange = (index: number, checked: boolean) => {
        let newGroupState = [...groupState];
        if (toggle) {
            newGroupState = newGroupState.map((option, i) => ({
                ...option,
                checked: i === index ? true : false,
            }));
        } else {
            newGroupState[index].checked = checked;
        }
        setGroupState(newGroupState);
        onChange?.call(this, newGroupState);
    };

    return (
        <div className={classes.checkboxGroup} style={{ flexDirection: vertical ? "column" : "row", ...applyDefaultStyle(rest)}}>
            {groupState.map((option, index) => (
                <CheckBox
                    key={index}
                    label={option.label}
                    checked={option.checked}
                    onChange={(checked) => handleChange(index, checked)}
                    disabled={option.disabled}
                    {...rest}
                />
            ))}
        </div>
    );
};