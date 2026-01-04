'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section className={styles.hero} ref={containerRef}>
            {/* Grid asimétrico */}
            <div className={styles.grid}>
                {/* Lado izquierdo - Texto */}
                <motion.div
                    className={styles.content}
                    style={{ y: textY, opacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={styles.eyebrow}>Constructora de Obras Civiles</span>
                    </motion.div>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Ingeniería
                        <br />
                        <span className={styles.titleAccent}>que Perdura</span>
                    </motion.h1>

                    <motion.div
                        className={styles.divider}
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Especialistas en infraestructura hospitalaria y obras civiles
                        de alta complejidad. Más de 15 años construyendo el futuro
                        de la arquitectura chilena.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/proyectos" className={styles.btnPrimary}>
                            Ver Proyectos
                        </Link>
                        <Link href="/cotizacion" className={styles.btnSecondary}>
                            Solicitar Cotización
                        </Link>
                    </motion.div>

                    {/* Estadísticas tipo plano técnico */}
                    <motion.div
                        className={styles.stats}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>150+</span>
                            <span className={styles.statLabel}>Proyectos</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Hospitales</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>15</span>
                            <span className={styles.statLabel}>Años</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Lado derecho - Imagen */}
                <motion.div
                    className={styles.imageWrapper}
                    style={{ y: imageY }}
                >
                    <motion.div
                        className={styles.imageContainer}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                            alt="Arquitectura moderna"
                            className={styles.image}
                        />
                        <div className={styles.imageOverlay} />
                    </motion.div>

                    {/* Etiqueta técnica */}
                    <motion.div
                        className={styles.imageLabel}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span>Torre Empresarial</span>
                        <span>Santiago, 2023</span>
                        <span>25.000 M²</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span>Scroll</span>
                <motion.div
                    className={styles.scrollLine}
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </section>
    );
}
