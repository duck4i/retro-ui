export const colors = {
    black: "#000000",
    red: "#840000",
    green: "#008400",
    yellow: "#FFFF00",
    blue: "#000084",
    magenta: "#FF00FF",
    cyan: "#00FFFF",
    white: "#FFFFFF",
    silver: "#C0C0C0"
} as const;

export type Color = keyof typeof colors;

export function getColor(color: Color): string {
    return colors[color];
}
