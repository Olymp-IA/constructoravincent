'use client';

import { motion } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = false,
    className = '',
}: ButtonProps) {
    const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

    const motionProps = {
        whileHover: { scale: disabled ? 1 : 1.01 },
        whileTap: { scale: disabled ? 1 : 0.99 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    };

    if (href) {
        return (
            <motion.a href={href} className={classes} {...motionProps}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...motionProps}
        >
            {children}
        </motion.button>
    );
}
