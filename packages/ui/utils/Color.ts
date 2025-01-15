export const colors = {
    black: "#000000",
    red: "#AA0000",
    green: "#008400",
    yellow: "#FFFF00",
    blue: "#0000AA",
    magenta: "#AA00AA",
    cyan: "#00AAAA",
    white: "#FFFFFF",
    silver: "#AAAAAA"
} as const;

/** Preset color pallete for your retro app */
export type Color = keyof typeof colors;

export function getColor(color: Color): string {
    return colors[color];
}
