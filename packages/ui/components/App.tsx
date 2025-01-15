import styles from "../global.module.css";
import { applyDefaultStyle, ComponentProps } from "../utils/ComponentProps";

export interface AppProps extends Partial<ComponentProps> {
    children?: React.ReactNode;
}

/**
 * RetroApp component serves as a root container and provides a classic blue background for your retro app.
 */
export function App({ children, ...rest }: AppProps) {
    return (
        <div id="retro-app-root"
            className={styles.app}
            style={{
                ...applyDefaultStyle(rest),
            }}
        >
            {children}
        </div>
    )
}