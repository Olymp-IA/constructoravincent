'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Card.module.css';

interface CardProps {
    title: string;
    description?: string;
    image?: string;
    icon?: React.ReactNode;
    href?: string;
    category?: string;
    onClick?: () => void;
    variant?: 'default' | 'service' | 'project';
}

export default function Card({
    title,
    description,
    image,
    icon,
    href,
    category,
    onClick,
    variant = 'default',
}: CardProps) {
    const content = (
        <motion.div
            className={`${styles.card} ${styles[variant]}`}
            whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
        >
            {image && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.imageOverlay} />
                    {category && <span className={styles.category}>{category}</span>}
                </div>
            )}

            {icon && <div className={styles.iconWrapper}>{icon}</div>}

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                {description && <p className={styles.description}>{description}</p>}
            </div>

            {variant === 'project' && (
                <div className={styles.viewMore}>
                    <span>Ver proyecto</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            )}
        </motion.div>
    );

    if (href) {
        return <a href={href} className={styles.link}>{content}</a>;
    }

    return content;
}
