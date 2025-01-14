import "../fonts.css";
import "../global.css";

export interface AppProps {
    children?: React.ReactNode;
}

/**
 * RetroApp component serves as a root container and provides a classic blue background for your retro app.
 */
export function App({ children }: AppProps) {
    return (
        <div id="retro-app-root" className={"retro-app"}>
            {children}
        </div>
    )
}