'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Services.module.css';

const services = [
    {
        number: '01',
        title: 'Infraestructura Hospitalaria',
        description: 'Diseño y construcción de complejos de salud de alta complejidad. Cumplimiento de normativas internacionales, sistemas de climatización especializada, gases medicinales y áreas críticas.',
        specs: ['UCI & Quirófanos', 'Laboratorios', 'Gases Medicinales'],
    },
    {
        number: '02',
        title: 'Obras Civiles',
        description: 'Desarrollo de infraestructura pública y privada. Urbanización, pavimentación, obras hidráulicas y proyectos de saneamiento bajo los más altos estándares de ingeniería.',
        specs: ['Urbanización', 'Obras Hidráulicas', 'Pavimentación'],
    },
    {
        number: '03',
        title: 'Edificación Comercial',
        description: 'Torres de oficinas, centros comerciales y hoteles. Arquitectura contemporánea con sistemas constructivos de última generación y certificaciones sustentables.',
        specs: ['Torres Corporativas', 'Retail', 'Hospitality'],
    },
    {
        number: '04',
        title: 'Industrial',
        description: 'Plantas de producción, centros de distribución y bodegas de gran envergadura. Optimización de procesos constructivos para entregas en tiempo récord.',
        specs: ['Naves Industriales', 'Centros Logísticos', 'Plantas de Proceso'],
    },
];

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className={`section ${styles.services}`} ref={ref}>
            <div className="container">
                {/* Header de sección */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.eyebrow}>Áreas de Especialización</span>
                    <h2 className={styles.title}>Servicios</h2>
                    <motion.div
                        className={styles.divider}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '100%' } : {}}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                </motion.div>

                {/* Lista de servicios */}
                <div className={styles.list}>
                    {services.map((service, index) => (
                        <motion.article
                            key={service.number}
                            className={styles.item}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.8,
                                delay: 0.2 + index * 0.15,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <div className={styles.itemNumber}>
                                <span>{service.number}</span>
                            </div>
                            <div className={styles.itemContent}>
                                <h3 className={styles.itemTitle}>{service.title}</h3>
                                <p className={styles.itemDescription}>{service.description}</p>
                                <div className={styles.itemSpecs}>
                                    {service.specs.map((spec) => (
                                        <span key={spec} className={styles.spec}>{spec}</span>
                                    ))}
                                </div>
                            </div>
                            <motion.div
                                className={styles.itemLine}
                                initial={{ width: 0 }}
                                animate={isInView ? { width: '100%' } : {}}
                                transition={{
                                    duration: 1,
                                    delay: 0.5 + index * 0.15,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            />
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
