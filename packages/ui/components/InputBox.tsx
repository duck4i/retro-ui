import { applyDefaultStyle, ComponentProps } from "../utils/ComponentProps";
import classes from "../global.module.css";
import { Scrollbar } from "./Scrollbar";
import { useLayoutEffect, useRef } from "react";

export interface InputBoxProps extends Partial<ComponentProps> {
    defaultValue?: string;
    border?: boolean;
    readOnly?: boolean;
    onChange: (value: string) => void;
}

export const InputBox = ({ defaultValue, border, onChange, readOnly, ...rest }: InputBoxProps) => {

    const containerRef = useRef<HTMLTextAreaElement>(null);

    const calculateHeight = () => {
        containerRef.current?.style.setProperty("height", "auto");
        containerRef.current?.style.setProperty("height", `${containerRef.current?.scrollHeight}px`);
    }

    useLayoutEffect(() => {
        calculateHeight();
    }, []);

    return (
        <Scrollbar style={{ backgroundColor: 'black' }} >
            <div className={classes.inputBoxWrapper}>
                <textarea ref={containerRef}
                    className={[classes.inputBox, border ? classes.inputBorder : ''].join(" ")}
                    defaultValue={defaultValue}
                    onChange={(e) => {
                        calculateHeight();
                        onChange?.call(this, e.target.value as string)
                    }}
                    readOnly={readOnly}
                    style={{ ...applyDefaultStyle(rest) }}
                />
            </div>
        </Scrollbar>
    )
}