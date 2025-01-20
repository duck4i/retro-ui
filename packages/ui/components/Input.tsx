import { ComponentProps } from "../utils/ComponentProps";
import classes from "../global.module.css";

export interface InputProps extends Partial<ComponentProps> {
    value?: string;
    defaultValue?: string;
    border?: boolean;
    readOnly?: boolean;
    onChange?: (value: string) => void;
}

export const Input = ({ value, defaultValue, border, onChange, readOnly, ...rest }: InputProps) => {
    return (
        <input
            className={[classes.input, border ? classes.inputBorder : ''].join(" ")}
            defaultValue={defaultValue}
            value={value}
            readOnly={readOnly}
            onChange={(e) => {
                onChange?.(e?.target?.value as string)
            }}
            {...rest}
        />
    )
}