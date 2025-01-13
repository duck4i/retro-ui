
export interface AppProps {
    children?: React.ReactNode;
}

export function App({ children }: AppProps) {
    return (
        <div>
            <p>Hey react</p>
            {children}
        </div>

    )
}