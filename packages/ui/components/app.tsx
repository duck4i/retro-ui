import "../global.css";

export interface AppProps {
    children?: React.ReactNode;
}

export function RetroApp({ children }: AppProps) {
    return (
        <div className={"app"}>
            {children}
        </div>
    )
}