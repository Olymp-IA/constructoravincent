'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

const categories = ['Todos', 'Hospitalario', 'Comercial', 'Residencial', 'Industrial'];

const projects = [
    { id: 1, title: 'Hospital Regional de Santiago', category: 'Hospitalario', year: 2023, description: 'Hospital de alta complejidad con 120 camas y tecnología de punta.' },
    { id: 2, title: 'Centro Médico Las Condes', category: 'Hospitalario', year: 2022, description: 'Ampliación y remodelación de centro médico con 8 pisos.' },
    { id: 3, title: 'Clínica Especialidades del Norte', category: 'Hospitalario', year: 2022, description: 'Centro de especialidades médicas con laboratorios.' },
    { id: 4, title: 'Torre Empresarial Altura', category: 'Comercial', year: 2023, description: 'Edificio de oficinas de 25 pisos con certificación LEED.' },
    { id: 5, title: 'Centro Comercial Plaza Sur', category: 'Comercial', year: 2021, description: 'Mall de 3 niveles con 150 locales comerciales.' },
    { id: 6, title: 'Hotel Boutique Costa', category: 'Comercial', year: 2023, description: 'Hotel de lujo con 80 habitaciones frente al mar.' },
    { id: 7, title: 'Condominio Vista Valle', category: 'Residencial', year: 2023, description: 'Conjunto residencial de 80 viviendas con áreas comunes premium.' },
    { id: 8, title: 'Edificio Parque Central', category: 'Residencial', year: 2022, description: 'Edificio de 15 pisos con 120 departamentos.' },
    { id: 9, title: 'Casas Alto Montaña', category: 'Residencial', year: 2021, description: 'Exclusivo proyecto de 12 casas mediterráneas.' },
    { id: 10, title: 'Planta Procesadora Alimentos Sur', category: 'Industrial', year: 2023, description: 'Planta de 5,000 m² con sistemas frigoríficos.' },
    { id: 11, title: 'Centro de Distribución Logística', category: 'Industrial', year: 2022, description: 'Bodega de 15,000 m² con andenes de carga.' },
    { id: 12, title: 'Nave Industrial Automotriz', category: 'Industrial', year: 2021, description: 'Instalación de ensamblaje con sistemas automatizados.' },
];

export default function ProyectosPage() {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const filteredProjects = activeCategory === 'Todos'
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground} />
                <div className={`container ${styles.heroContent}`}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Nuestros Proyectos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Conoce nuestro portafolio de obras completadas
                    </motion.p>
                </div>
            </section>

            {/* Projects */}
            <section className={`section ${styles.projects}`} ref={ref}>
                <div className="container">
                    {/* Filters */}
                    <motion.div
                        className={styles.filters}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Grid */}
                    <div className={styles.grid}>
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className={styles.card}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <div className={styles.cardImage}>
                                        <span className={styles.category}>{project.category}</span>
                                        <span className={styles.year}>{project.year}</span>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3>{project.title}</h3>
                                        <p>{project.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* CTA */}
                    <motion.div
                        className={styles.cta}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p>¿Le gustaría que su proyecto sea el próximo?</p>
                        <Button href="/cotizacion" variant="primary" size="lg">
                            Solicitar Cotización
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
