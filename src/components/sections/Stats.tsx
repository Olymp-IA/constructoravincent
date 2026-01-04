'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, Trophy, Clock } from 'lucide-react';
import styles from './Stats.module.css';

const stats = [
    { icon: Building2, value: 150, suffix: '+', label: 'Proyectos Completados' },
    { icon: Users, value: 50, suffix: '+', label: 'Clientes Satisfechos' },
    { icon: Trophy, value: 15, suffix: '+', label: 'Años de Experiencia' },
    { icon: Clock, value: 98, suffix: '%', label: 'Entregas a Tiempo' },
];

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

export default function Stats() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section className={styles.stats}>
            <div className={styles.background}>
                <div className={styles.pattern} />
            </div>

            <div className="container" ref={containerRef}>
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className={styles.item}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <div className={styles.iconWrapper}>
                                <stat.icon size={32} />
                            </div>
                            <div className={styles.value}>
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className={styles.label}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
