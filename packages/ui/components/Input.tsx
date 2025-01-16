import { ComponentProps } from "../utils/ComponentProps";
import classes from "../global.module.css";

export interface InputProps extends Partial<ComponentProps> {
    defaultValue?: string;
    border?: boolean;
    onChange: (value: string) => void;
}

export const Input = ({ defaultValue, border, onChange, ...rest }: InputProps) => {
    return (
        <input
            className={[classes.input, border ? classes.inputBorder: ''].join(" ")}
            defaultValue={defaultValue}
            onChange={(e) => onChange?.call(this, e.target.value as string)}
            {...rest}
        />
    )
}