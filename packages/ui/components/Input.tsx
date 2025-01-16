import { ComponentProps } from "../utils/ComponentProps";
import classes from "../global.module.css";

export interface InputProps extends Partial<ComponentProps> {
    defaultValue?: string;
    border?: boolean;
    readOnly?: boolean;
    onChange: (value: string) => void;
}

export const Input = ({ defaultValue, border, onChange, readOnly, ...rest }: InputProps) => {
    return (
        <input
            className={[classes.input, border ? classes.inputBorder: ''].join(" ")}
            defaultValue={defaultValue}
            readOnly={readOnly}
            onChange={(e) => onChange?.call(this, e.target.value as string)}
            {...rest}
        />
    )
}