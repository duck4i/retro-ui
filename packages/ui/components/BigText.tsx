import { useEffect, useState } from 'react';
import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

const ASCII_CHARS = {
    A: [
       "  ▄▀▀▄ ",
       " █▄▄▄█ ",
       " █   █ ",
    ],
    B: [
       " █▀▀▄  ",
       " █▀▀▄  ",
       " █▄▄▀  ",
    ],
    C: [
       " █▀▀▄  ",
       " █     ",
       " █▄▄▀  ",
    ],
    D: [
       " █▀▀▄  ",
       " █  █  ",
       " █▄▄▀  ",
    ],
    E: [
       " █▀▀▀  ",
       " █▀▀   ",
       " █▄▄▄  ",
    ],
    F: [
       " █▀▀▀  ",
       " █▀▀   ",
       " █     ",
    ],
    G: [
       " █▀▀▄  ",
       " █ ▀█  ",
       " █▄▄▀  ",
    ],
    H: [
       " █  █  ",
       " █▀▀█  ",
       " █  █  ",
    ],
    I: [
       " ▀█▀   ",
       "  █    ",
       " ▄█▄   ",
    ],
    J: [
       "   █   ",
       "   █   ",
       " █▄▀   ",
    ],
    K: [
       " █ █   ",
       " █▀▄   ",
       " █ █   ",
    ],
    L: [
       " █     ",
       " █     ",
       " █▄▄▄  ",
    ],
    M: [
       " █▄ ▄█ ",
       " █ ▀ █ ",
       " █   █ ",
    ],
    N: [
       " █▄  █ ",
       " █ █ █ ",
       " █  ▀█ ",
    ],
    O: [
       " █▀▀█  ",
       " █  █  ",
       " █▄▄█  ",
    ],
    P: [
       " █▀▀▄  ",
       " █▄▄▀  ",
       " █     ",
    ],
    Q: [
       " █▀▀█  ",
       " █  █  ",
       " █▄▄▀█ ",
    ],
    R: [
       " █▀▀▄  ",
       " █▄▄▀  ",
       " █  █  ",
    ],
    S: [
       " █▀▀▄  ",
       " █▄▄▀  ",
       " ▀▄▄▀  ",
    ],
    T: [
       " ▀█▀   ",
       "  █    ",
       "  █    ",
    ],
    U: [
       " █  █  ",
       " █  █  ",
       " █▄▄█  ",
    ],
    V: [
       " █  █  ",
       " █  █  ",
       "  ▀▀   ",
    ],
    W: [
       " █   █ ",
       " █ ▄ █ ",
       " ▀▄▀▄▀ ",
    ],
    X: [
       " █  █  ",
       "  ▄▀   ",
       " █  █  ",
    ],
    Y: [
       " █  █  ",
       "  █▀   ",
       "  █    ",
    ],
    Z: [
       " █▀▀▀  ",
       "  ▀▄   ",
       " █▄▄▄  ",
    ],
   "": [
       "       ",
       "       ",
       "       ",
    ],
   "0": [
       " █▀▀█  ",
       " █▄▀█  ",
       " █▄▄█  ",
    ],
   "1": [
       "  ▄█   ",
       "   █   ",
       "  ▄█▄  ",
    ],
   "2": [
       " █▀▀█  ",
       "   █   ",
       " █▄▄▄  ",
    ],
   "3": [
       " █▀▀█  ",
       "   █   ",
       " █▄▄█  ",
    ],
   "4": [
       " █  █  ",
       " █▄▄█  ",
       "    █  ",
    ],
   "5": [
       " █▀▀▀  ",
       " █▄▄   ",
       " ▀▄▄█  ",
    ],
   "6": [
       " █▀▀▄  ",
       " █▄▄   ",
       " █▄▄▀  ",
    ],
   "7": [
       " █▀▀█  ",
       "   █   ",
       "  █    ",
    ],
   "8": [
       " █▀▀█  ",
       " █▄▄█  ",
       " █▄▄█  ",
    ],
   "9": [
       " █▀▀█  ",
       " █▄▄█  ",
       "   ▄█  ",
    ],
   "!": [
       "  █    ",
       "  █    ",
       "  ▀    ",
    ],
   ".": [
       "       ",
       "       ",
       "  ▄    ",
    ],
   "?": [
       " █▀▀█  ",
       "   █   ",
       "   ▄    ",
    ],
} as const;

interface BigTextProps extends Partial<ComponentProps> {
    label: string;
    bold?: boolean;
    blink?: boolean;
}

/** A label that generates ASCII text for you. */
export const BigText = ({ label, bold, blink, ...rest }: BigTextProps) => {
    const [asciiLines, setAsciiLines] = useState<string[][]>([[], [], []]);

    useEffect(() => {
        const upperText = label.toUpperCase();
        const newLines: string[][] = [[], [], []];

        for (const char of upperText) {
            const asciiChar = ASCII_CHARS[char as keyof typeof ASCII_CHARS] || ASCII_CHARS[''];
            newLines[0].push(asciiChar[0]);
            newLines[1].push(asciiChar[1]);
            newLines[2].push(asciiChar[2]);
        }

        setAsciiLines(newLines);
    }, [label]);


    return (
        <div className={[
            styles.bigText,
            bold ? styles.textBold : '',
            blink ? styles.textBlink : '',
        ].join(' ')}
            style={{
                ...applyDefaultStyle(rest),
            }}
        >
            {asciiLines.map((line, lineIndex) => (
                <div key={lineIndex} >
                    {line.join('')}
                </div>
            ))}
        </div>
    );
};
