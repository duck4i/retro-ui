import styles from '../global.module.css';
import { applyDefaultStyle, ComponentProps } from '../utils/ComponentProps';

interface ProgressBarProps extends Partial<ComponentProps> {
    progress: number;
    max: number;
}

/** A retro-styled progress bar component */
export const ProgressBar = ({ progress, max, ...rest }: ProgressBarProps) => {
    const percentage = (progress / max) * 100;

    return (
        <div className={styles.progressRoot} style={{ ...applyDefaultStyle(rest) }}>
            <span className={styles.progressLabel}>{`${percentage.toFixed(2)}%`}</span>
            <progress  className={styles.progress} value={progress} max={max}/>
        </div>
    );
};