import "../global.css";

export interface AppProps {
    children?: React.ReactNode;
}

export function RetroApp({ children }: AppProps) {
    return (
        <div id="retro-app-root" className={"retro-app"}>
            {children}
        </div>
    )
}