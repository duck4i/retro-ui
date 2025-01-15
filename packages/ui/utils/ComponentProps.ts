import { Color, getColor } from "./Color";

export interface ComponentProps {
    color?: Color,
    backgroundColor?: Color,
    width?: string | number,
    height?: string | number,
    padding?: number,
    margin?: number,
    gap?: number,
    [key: string]: any,
};

export function applyDefaultStyle(props: Partial<ComponentProps>): React.CSSProperties {
    const style: React.CSSProperties = {};

    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            if (key === 'backgroundColor' && props.backgroundColor) {
                style.backgroundColor = getColor(props.backgroundColor);
            } else {
                (style as any)[key] = props[key];
            }
        }
    }

    return style;
}
