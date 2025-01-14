import { createContext, useState } from "react";

interface WindowContextType {
    topZIndex: number;
    bringToFront: () => number;
}

export const WindowContext = createContext<WindowContextType | null>(null);

/** A provider component that manages the z-index of windows */
export function WindowProvider({ children }: { children: React.ReactNode }) {
    const [topZIndex, setTopZIndex] = useState(1000);

    const bringToFront = () => {
        setTopZIndex(prev => prev + 1);
        return topZIndex + 1;
    };

    return (
        <WindowContext.Provider value={{ topZIndex, bringToFront }}>
            {children}
        </WindowContext.Provider>
    );
}
