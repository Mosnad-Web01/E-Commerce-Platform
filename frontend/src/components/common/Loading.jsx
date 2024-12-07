import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Loading = ({ size = 'md', color = 'primary', speed = 'normal', shape = 'circle', text = '' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-10 w-10',
    };

    const speedDurations = {
        slow: '3s',
        normal: '1.5s',
        fast: '0.75s',
    };

    const shapes = {
        circle: 'rounded-full border-[3px] animate-spin',
        dots: 'flex space-x-2 items-center justify-center animate-ping',
        bars: 'flex space-x-1 items-center justify-center animate-stretch',
        wave: 'flex space-x-1 items-center justify-center animate-wave',
        ring: 'animate-ring',
        ellipsis: 'animate-ellipsis',
        pulse: 'animate-pulse',
    };

    const animationStyle = {
        animationDuration: speedDurations[speed],
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            {/* Circle Spinner */}
            {shape === 'circle' && (
                <div
                    className={clsx(
                        sizes[size],
                        shapes[shape],
                        'border-light-muted dark:border-dark-muted border-t-[var(--tw-color)] shadow-glowLight dark:shadow-glowDark'
                    )}
                    style={{
                        ...animationStyle,
                        borderTopColor: `var(--tw-color-${color})`,
                    }}
                />
            )}

            {/* Dots Spinner */}
            {shape === 'dots' && (
                <div className={clsx(shapes[shape])}>
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={clsx('rounded-full', sizes[size])}
                            style={{
                                backgroundColor: `var(--tw-color-${color})`,
                            }}
                        />
                    ))}
                </div>
            )}

            {shape === 'bars' && (
                <div className={clsx(shapes[shape])}>
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={clsx('w-2 h-6 rounded-sm', sizes[size])}
                            style={{
                                backgroundColor: `var(--tw-color-${color})`,
                                animation: `stretch 1.5s infinite ${index * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {shape === 'ring' && (
                <div
                    className={clsx(
                        'relative border-4 border-muted',
                        sizes[size],
                        'rounded-full animate-spin'
                    )}
                >
                    <div
                        className="absolute top-0 left-0 w-1/2 h-full bg-[var(--tw-color-primary)] rounded-full"
                    />
                </div>
            )}

            {shape === 'ellipsis' && (
                <div className="flex space-x-2 items-center justify-center">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={clsx('rounded-full', sizes[size])}
                            style={{
                                backgroundColor: `var(--tw-color-${color})`,
                                animation: `ellipsis 1.5s infinite ${index * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {shape === 'pulse' && (
                <div
                    className={clsx(
                        'rounded-full',
                        sizes[size],
                        'bg-[var(--tw-color-primary)]'
                    )}
                    style={{
                        animation: `pulse 1.5s infinite ease-in-out`,
                    }}
                />
            )}

            {shape === 'wave' && (
                <div className="flex space-x-1 items-end justify-center">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-[var(--tw-color-primary)] w-2 h-5 rounded-sm"
                            style={{
                                animation: `wave 1.2s ease-in-out infinite`,
                                animationDelay: `${index * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            )}


            {/* Loading Text */}
            {text && <span className="text-sm text-muted dark:text-text">{text}</span>}
        </div>
    );
};

Loading.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'muted', 'border']),
    speed: PropTypes.oneOf(['slow', 'normal', 'fast']),
    shape: PropTypes.oneOf(['circle', 'dots', 'bars', 'ring', 'ellipsis', 'pulse', 'wave']),
    text: PropTypes.string,
};

export default Loading;
