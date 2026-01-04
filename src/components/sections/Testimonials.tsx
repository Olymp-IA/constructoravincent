'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Dr. Roberto Fernández',
        role: 'Director General',
        company: 'Hospital Regional de Santiago',
        content: 'Constructora Vincent superó todas nuestras expectativas. Su profesionalismo y atención al detalle en la construcción de nuestras instalaciones hospitalarias fue excepcional.',
    },
    {
        id: 2,
        name: 'María Elena Torres',
        role: 'Gerente de Proyectos',
        company: 'Inmobiliaria Sur',
        content: 'Hemos trabajado con Vincent en múltiples proyectos residenciales. Su compromiso con la calidad y los plazos de entrega es incomparable en el mercado.',
    },
    {
        id: 3,
        name: 'Carlos Mendoza',
        role: 'CEO',
        company: 'Grupo Industrial Norte',
        content: 'La construcción de nuestra planta industrial fue un éxito gracias al equipo de Vincent. Profesionales de primera categoría que recomiendo ampliamente.',
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className={`section ${styles.testimonials}`}>
            <div className="container" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
                    <div className="accent-line" />
                </motion.div>

                <motion.div
                    className={styles.slider}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <button className={styles.navBtn} onClick={prev} aria-label="Previous testimonial">
                        <ChevronLeft size={24} />
                    </button>

                    <div className={styles.content}>
                        <Quote className={styles.quoteIcon} size={48} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className={styles.testimonial}
                            >
                                <p className={styles.text}>{testimonials[currentIndex].content}</p>
                                <div className={styles.author}>
                                    <div className={styles.avatar}>
                                        {testimonials[currentIndex].name.charAt(0)}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <strong className={styles.name}>{testimonials[currentIndex].name}</strong>
                                        <span className={styles.role}>
                                            {testimonials[currentIndex].role} - {testimonials[currentIndex].company}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button className={styles.navBtn} onClick={next} aria-label="Next testimonial">
                        <ChevronRight size={24} />
                    </button>
                </motion.div>

                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
