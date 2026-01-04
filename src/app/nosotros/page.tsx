'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Eye, Heart, Shield, Award, Users } from 'lucide-react';
import styles from './page.module.css';

const values = [
    { icon: Shield, title: 'Integridad', description: 'Actuamos con honestidad y transparencia en cada proyecto.' },
    { icon: Award, title: 'Excelencia', description: 'Buscamos la perfección en cada detalle de nuestras obras.' },
    { icon: Users, title: 'Compromiso', description: 'Nos comprometemos con cada cliente como si fuera el único.' },
    { icon: Heart, title: 'Pasión', description: 'Amamos lo que hacemos y eso se refleja en nuestro trabajo.' },
];

const team = [
    { name: 'Carlos Vincent', role: 'Director General', initials: 'CV' },
    { name: 'María González', role: 'Gerente de Proyectos', initials: 'MG' },
    { name: 'Roberto Sánchez', role: 'Jefe de Obras', initials: 'RS' },
    { name: 'Ana Martínez', role: 'Arquitecta Senior', initials: 'AM' },
];

export default function NosotrosPage() {
    const historyRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);
    const historyInView = useInView(historyRef, { once: true, margin: '-100px' });
    const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
    const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

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
                        Sobre Nosotros
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Más de 15 años construyendo sueños y transformando espacios
                    </motion.p>
                </div>
            </section>

            {/* History */}
            <section className={`section ${styles.history}`} ref={historyRef}>
                <div className="container">
                    <div className={styles.historyGrid}>
                        <motion.div
                            className={styles.historyContent}
                            initial={{ opacity: 0, x: -30 }}
                            animate={historyInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <h2>Nuestra Historia</h2>
                            <div className="accent-line" style={{ margin: 'var(--space-4) 0' }} />
                            <p>
                                Constructora Vincent nació en 2009 con la visión de transformar
                                la industria de la construcción en Chile. Lo que comenzó como un
                                pequeño emprendimiento familiar, hoy es una de las constructoras
                                más reconocidas en el sector hospitalario y de obras civiles.
                            </p>
                            <p>
                                A lo largo de estos años, hemos construido más de 50 instalaciones
                                de salud, incluyendo hospitales de alta complejidad, clínicas y
                                centros médicos que hoy atienden a miles de personas.
                            </p>
                            <p>
                                Nuestro compromiso con la calidad, la seguridad y la innovación
                                nos ha permitido ganar la confianza de importantes instituciones
                                públicas y privadas en todo el país.
                            </p>
                        </motion.div>
                        <motion.div
                            className={styles.historyImage}
                            initial={{ opacity: 0, x: 30 }}
                            animate={historyInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className={styles.imagePlaceholder}>
                                <span>Vincent</span>
                                <span>Desde 2009</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className={`section ${styles.missionVision}`}>
                <div className="container">
                    <div className={styles.mvGrid}>
                        <motion.div
                            className={styles.mvCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={styles.mvIcon}>
                                <Target size={40} />
                            </div>
                            <h3>Misión</h3>
                            <p>
                                Construir infraestructura de calidad que mejore la vida de las
                                personas, especialmente en el sector salud, aplicando las mejores
                                prácticas de la industria y manteniendo los más altos estándares
                                de seguridad y sostenibilidad.
                            </p>
                        </motion.div>
                        <motion.div
                            className={styles.mvCard}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className={styles.mvIcon}>
                                <Eye size={40} />
                            </div>
                            <h3>Visión</h3>
                            <p>
                                Ser la constructora líder en proyectos de salud en Latinoamérica,
                                reconocida por nuestra excelencia técnica, innovación constante y
                                compromiso inquebrantable con nuestros clientes y la comunidad.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className={`section ${styles.values}`} ref={valuesRef}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Nuestros Valores</h2>
                        <div className="accent-line" />
                    </motion.div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                className={styles.valueCard}
                                initial={{ opacity: 0, y: 30 }}
                                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className={styles.valueIcon}>
                                    <value.icon size={32} />
                                </div>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className={`section ${styles.team}`} ref={teamRef}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={teamInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Nuestro Equipo</h2>
                        <div className="accent-line" />
                        <p className="section-subtitle">
                            Profesionales comprometidos con la excelencia
                        </p>
                    </motion.div>
                    <div className={styles.teamGrid}>
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className={styles.teamCard}
                                initial={{ opacity: 0, y: 30 }}
                                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className={styles.teamAvatar}>
                                    {member.initials}
                                </div>
                                <h4>{member.name}</h4>
                                <p>{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
