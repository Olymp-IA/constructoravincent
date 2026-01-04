'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import styles from './Projects.module.css';

const projects = [
    {
        id: 1,
        title: 'Hospital Regional Metropolitano',
        location: 'Santiago, Chile',
        year: '2023',
        area: '45.000 M²',
        category: 'Hospitalario',
        image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1600&q=80',
    },
    {
        id: 2,
        title: 'Torre Corporativa Altura',
        location: 'Las Condes, Santiago',
        year: '2022',
        area: '28.000 M²',
        category: 'Comercial',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
    },
    {
        id: 3,
        title: 'Centro de Especialidades Médicas',
        location: 'Viña del Mar',
        year: '2023',
        area: '12.000 M²',
        category: 'Hospitalario',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80',
    },
];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className={`${styles.projects}`} ref={ref}>
            {/* Header */}
            <div className={`container ${styles.header}`}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Portafolio</span>
                    <h2 className={styles.title}>Proyectos Seleccionados</h2>
                </motion.div>
            </div>

            {/* Lista de proyectos - Layout editorial */}
            <div className={styles.list}>
                {projects.map((project, index) => (
                    <motion.article
                        key={project.id}
                        className={styles.item}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{
                            duration: 1,
                            delay: 0.2 + index * 0.2,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        {/* Imagen grande */}
                        <div className={styles.imageWrapper}>
                            <motion.div
                                className={styles.imageContainer}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={styles.image}
                                />
                                <div className={styles.imageOverlay} />
                            </motion.div>
                        </div>

                        {/* Info tipo plano arquitectónico */}
                        <div className={styles.info}>
                            <div className={styles.infoHeader}>
                                <span className={styles.projectNumber}>0{index + 1}</span>
                                <span className={styles.projectCategory}>{project.category}</span>
                            </div>

                            <h3 className={styles.projectTitle}>{project.title}</h3>

                            <div className={styles.specs}>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>Ubicación</span>
                                    <span className={styles.specValue}>{project.location}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>Año</span>
                                    <span className={styles.specValue}>{project.year}</span>
                                </div>
                                <div className={styles.specItem}>
                                    <span className={styles.specLabel}>Superficie</span>
                                    <span className={styles.specValue}>{project.area}</span>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* CTA */}
            <div className={`container ${styles.cta}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link href="/proyectos" className={styles.ctaLink}>
                        Ver todos los proyectos
                        <span className={styles.ctaArrow}>→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
