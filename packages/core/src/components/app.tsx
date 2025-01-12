
export interface AppProps {
    children?: React.ReactNode
}

export function App({ children }: AppProps) {
    return (
        <div>
            {children}
        </div>
    )
}