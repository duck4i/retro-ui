import { useState } from "react";
import { CheckBox } from "./CheckBox";
import { applyDefaultStyle, ComponentProps } from "../utils/ComponentProps";
import classes from "../global.module.css";

interface CheckBoxGroupProps extends Partial<ComponentProps> {
    options: { label: string; checked: boolean; disabled?: boolean }[];
    onChange?: (options: { label: string; checked: boolean }[]) => void;
    vertical?: boolean;
}

/** A group of checkbox components */
export const CheckBoxGroup = ({ options, vertical, onChange, ...rest }: CheckBoxGroupProps) => {
    const [groupState, setGroupState] = useState(options);

    const handleChange = (index: number, checked: boolean) => {
        const newGroupState = [...groupState];
        newGroupState[index].checked = checked;
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