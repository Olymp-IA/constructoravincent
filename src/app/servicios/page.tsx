'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hospital, Building, Home, Wrench, Warehouse, HardHat, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

const services = [
    {
        icon: Hospital,
        title: 'Construcción Hospitalaria',
        description: 'Especialistas en la construcción de instalaciones de salud que cumplen con los más estrictos estándares internacionales.',
        features: [
            'Hospitales de alta complejidad',
            'Clínicas y centros médicos',
            'Laboratorios especializados',
            'Salas de cirugía y UCI',
            'Sistemas de gases medicinales',
        ],
    },
    {
        icon: Building,
        title: 'Edificios Comerciales',
        description: 'Desarrollo de espacios comerciales modernos y funcionales que impulsan el éxito de su negocio.',
        features: [
            'Torres de oficinas',
            'Centros comerciales',
            'Hoteles y hospitality',
            'Edificios corporativos',
            'Espacios coworking',
        ],
    },
    {
        icon: Home,
        title: 'Proyectos Residenciales',
        description: 'Construcción de viviendas de alta calidad con los mejores acabados y diseños innovadores.',
        features: [
            'Casas unifamiliares',
            'Edificios de departamentos',
            'Condominios exclusivos',
            'Proyectos inmobiliarios',
            'Viviendas sustentables',
        ],
    },
    {
        icon: Warehouse,
        title: 'Naves Industriales',
        description: 'Diseño y construcción de instalaciones industriales optimizadas para su operación.',
        features: [
            'Bodegas y centros de distribución',
            'Plantas de producción',
            'Centros logísticos',
            'Instalaciones frigoríficas',
            'Plantas de proceso',
        ],
    },
    {
        icon: Wrench,
        title: 'Remodelaciones',
        description: 'Renovación integral de espacios existentes para adaptarlos a nuevas necesidades.',
        features: [
            'Ampliaciones',
            'Renovación de fachadas',
            'Redistribución de espacios',
            'Actualización de instalaciones',
            'Cambio de uso de edificios',
        ],
    },
    {
        icon: HardHat,
        title: 'Infraestructura',
        description: 'Desarrollo de proyectos de infraestructura pública y privada de gran envergadura.',
        features: [
            'Urbanización',
            'Obras hidráulicas',
            'Caminos y pavimentación',
            'Puentes y viaductos',
            'Obras de saneamiento',
        ],
    },
];

export default function ServiciosPage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

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
                        Nuestros Servicios
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Soluciones integrales en construcción para todos los sectores
                    </motion.p>
                </div>
            </section>

            {/* Services */}
            <section className={`section ${styles.services}`} ref={ref}>
                <div className="container">
                    <div className={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                className={styles.serviceCard}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className={styles.serviceHeader}>
                                    <div className={styles.serviceIcon}>
                                        <service.icon size={36} />
                                    </div>
                                    <h3>{service.title}</h3>
                                </div>
                                <p className={styles.serviceDescription}>{service.description}</p>
                                <ul className={styles.featuresList}>
                                    {service.features.map((feature) => (
                                        <li key={feature}>
                                            <CheckCircle size={16} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button href="/cotizacion" variant="ghost" className={styles.serviceBtn}>
                                    Solicitar información
                                    <ArrowRight size={18} />
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div className={styles.ctaBackground} />
                <div className="container">
                    <motion.div
                        className={styles.ctaContent}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>¿Tiene un proyecto en mente?</h2>
                        <p>
                            Contáctenos y nuestro equipo de expertos le ayudará a hacerlo realidad
                        </p>
                        <Button href="/cotizacion" variant="primary" size="lg">
                            Solicitar Cotización Gratis
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
