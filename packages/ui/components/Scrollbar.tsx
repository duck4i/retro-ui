import React, { useState, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import styles from '../global.module.css';

interface RetroScrollbarProps {
    children: ReactNode;
    height?: string;
    width?: string;
    alwaysShowVertical?: boolean;
    alwaysShowHorizontal?: boolean;
}

export const Scrollbar = ({ children, height = '100%', width = '100%', alwaysShowVertical = false, alwaysShowHorizontal = false }: RetroScrollbarProps & { alwaysShowVertical?: boolean, alwaysShowHorizontal?: boolean }) => {
    const [showVerticalScrollbar, setShowVerticalScrollbar] = useState(alwaysShowVertical);
    const [showHorizontalScrollbar, setShowHorizontalScrollbar] = useState(alwaysShowHorizontal);
    const [verticalPosition, setVerticalPosition] = useState(0);
    const [horizontalPosition, setHorizontalPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [startScroll, setStartScroll] = useState({ top: 0, left: 0, isHorizontal: false });
    const [buttonSize] = useState(15);
    const [thumbHeight, setThumbHeight] = useState(20);
    const [thumbWidth, setThumbWidth] = useState(20);

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const checkScrollable = () => {
        if (contentRef.current && containerRef.current) {
            const hasVerticalScroll = contentRef.current.scrollHeight > containerRef.current.clientHeight;
            const hasHorizontalScroll = contentRef.current.scrollWidth > containerRef.current.clientWidth;

            setShowVerticalScrollbar(alwaysShowVertical || hasVerticalScroll);
            setShowHorizontalScrollbar(alwaysShowHorizontal || hasHorizontalScroll);

            const { thumbHeight, thumbWidth } = getScrollbarDimensions();
            setThumbHeight(thumbHeight);
            setThumbWidth(thumbWidth);
        }
    };

    useLayoutEffect(() => {
        checkScrollable();
    }, [children]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            checkScrollable();
        });

        if (wrapperRef.current) {
            resizeObserver.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                resizeObserver.unobserve(wrapperRef.current);
            }
        };
    }, []);

    const handleScroll = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const maxVerticalScroll = container.scrollHeight - container.clientHeight;
        const maxHorizontalScroll = container.scrollWidth - container.clientWidth;

        if (maxVerticalScroll > 0) {
            const newVerticalPosition = (container.scrollTop / maxVerticalScroll) * 100;
            setVerticalPosition(Math.min(100, Math.max(0, newVerticalPosition)));
        }

        if (maxHorizontalScroll > 0) {
            const newHorizontalPosition = (container.scrollLeft / maxHorizontalScroll) * 100;
            setHorizontalPosition(Math.min(100, Math.max(0, newHorizontalPosition)));
        }
    };

    const scroll = (direction: string, amount: number) => {
        if (containerRef.current) {
            const multiplier = direction === 'up' || direction === 'left' ? -1 : 1;

            if (direction === 'up' || direction === 'down') {
                containerRef.current.scrollTop += amount * multiplier;
            } else {
                containerRef.current.scrollLeft += amount * multiplier;
            }
        }
    };

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>, isHorizontal: boolean) => {
        setIsDragging(true);
        setStartPosition({ x: e.clientX, y: e.clientY });
        if (containerRef.current) {
            setStartScroll({
                top: containerRef.current.scrollTop,
                left: containerRef.current.scrollLeft,
                isHorizontal
            });
        }
        e.preventDefault();
    };

    const handleDrag = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const container = containerRef.current;
        const { isHorizontal } = startScroll;
        const speedMultiplier = 2;

        if (isHorizontal) {
            const deltaX = e.clientX - startPosition.x;
            const horizontalRatio = (container.scrollWidth - container.clientWidth) / (container.clientWidth - buttonSize * 2);
            container.scrollLeft = startScroll.left + (deltaX * horizontalRatio * speedMultiplier);
        } else {
            const deltaY = e.clientY - startPosition.y;
            const verticalRatio = (container.scrollHeight - container.clientHeight) / (container.clientHeight - buttonSize * 2);
            container.scrollTop = startScroll.top + (deltaY * verticalRatio * speedMultiplier);
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', handleDragEnd);
            document.body.style.userSelect = 'none';
        }
        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);
            document.body.style.userSelect = '';
        };
    }, [isDragging]);

    const getScrollbarDimensions = () => {
        if (!containerRef.current) return { thumbHeight: 20, thumbWidth: 20 };

        const container = containerRef.current;
        const viewportHeight = container.clientHeight;
        const viewportWidth = container.clientWidth;
        const totalHeight = container.scrollHeight;
        const totalWidth = container.scrollWidth;

        const thumbHeight = Math.max(10, (viewportHeight / totalHeight) * (viewportHeight - buttonSize * 2));
        const thumbWidth = Math.max(10, (viewportWidth / totalWidth) * (viewportWidth - buttonSize * 2));

        return { thumbHeight, thumbWidth };
    };

    return (
        <div ref={wrapperRef} className={styles.wrapper} style={{ width, height }}>
            <div ref={containerRef} className={styles.viewport} onScroll={handleScroll}>
                <div ref={contentRef} className={styles.content}>
                    {children}
                </div>
            </div>

            {showVerticalScrollbar && (
                <div className={styles.scrollTrackVertical}>
                    <div className={styles.scrollPattern} />
                    <button
                        className={`${styles.scrollButton} ${styles.buttonUp}`}
                        onClick={() => scroll('up', 25)}
                        type="button"
                    >
                        ▲
                    </button>

                    {contentRef.current && contentRef.current.scrollHeight > (containerRef.current?.clientHeight || 0) && (
                        <div
                            className={styles.scrollThumbVertical}
                            style={{
                                height: thumbHeight,
                                top: `${buttonSize + verticalPosition * ((containerRef.current?.clientHeight || 0) - buttonSize * 1 - thumbHeight) / 100}px`
                            }}
                            onMouseDown={(e) => handleDragStart(e, false)}
                        />
                    )}

                    <button
                        className={`${styles.scrollButton} ${styles.buttonDown}`}
                        onClick={() => scroll('down', 25)}
                        type="button"
                    >
                        ▼
                    </button>
                </div>
            )}

            {showHorizontalScrollbar && (
                <div className={styles.scrollTrackHorizontal} style={{ width: showVerticalScrollbar ? `calc(100% - ${buttonSize}px)` : '100%' }}>
                    <div className={styles.scrollPatternHorizontal} />
                    <button
                        className={`${styles.scrollButton} ${styles.buttonLeft}`}
                        onClick={() => scroll('left', 25)}
                        type="button"
                    >
                        ◀
                    </button>

                    {contentRef.current && contentRef.current.scrollWidth > (containerRef.current?.clientWidth || 0) && (
                        <div
                            className={styles.scrollThumbHorizontal}
                            style={{
                                width: thumbWidth,
                                left: `${buttonSize + horizontalPosition * ((containerRef.current?.clientWidth || 0) - buttonSize - thumbWidth) / 100}px`
                            }}
                            onMouseDown={(e) => handleDragStart(e, true)}
                        />
                    )}

                    <button
                        className={`${styles.scrollButton} ${styles.buttonRight}`}
                        onClick={() => scroll('right', 25)}
                        type="button"
                    >
                        ▶
                    </button>
                </div>
            )}

            {showVerticalScrollbar && showHorizontalScrollbar && (
                <div className={styles.cornerBox} />
            )}
        </div>
    );
};