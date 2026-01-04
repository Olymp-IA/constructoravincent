'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactoSchema, type ContactoFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function ContactoPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactoFormData>({
        resolver: zodResolver(contactoSchema),
    });

    const onSubmit = async (data: ContactoFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'contacto', data }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.message || 'Error al enviar el mensaje');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Error de conexión. Por favor intente nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        Contáctenos
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Estamos listos para ayudarle con su próximo proyecto
                    </motion.p>
                </div>
            </section>

            {/* Contact Section */}
            <section className={`section ${styles.contactSection}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Contact Info */}
                        <motion.div
                            className={styles.info}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2>Información de Contacto</h2>
                            <p className={styles.infoDescription}>
                                Contáctenos a través de cualquiera de nuestros canales de comunicación
                                o complete el formulario y le responderemos en menos de 24 horas.
                            </p>

                            <ul className={styles.contactList}>
                                <li>
                                    <div className={styles.contactIcon}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <strong>Dirección</strong>
                                        <span>Av. Principal 1234, Piso 10<br />Santiago, Chile</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.contactIcon}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <strong>Teléfonos</strong>
                                        <a href="tel:+56212345678">+56 2 1234 5678</a>
                                        <a href="tel:+56912345678">+56 9 1234 5678</a>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.contactIcon}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <strong>Email</strong>
                                        <a href="mailto:contacto@constructoravincent.cl">contacto@constructoravincent.cl</a>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.contactIcon}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <strong>Horario de Atención</strong>
                                        <span>Lunes a Viernes: 8:00 - 18:00</span>
                                        <span>Sábado: 9:00 - 13:00</span>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            className={styles.formWrapper}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {submitStatus === 'success' ? (
                                <div className={styles.successMessage}>
                                    <CheckCircle size={64} />
                                    <h3>¡Mensaje Enviado!</h3>
                                    <p>Gracias por contactarnos. Le responderemos pronto.</p>
                                    <Button onClick={() => setSubmitStatus('idle')} variant="primary">
                                        Enviar otro mensaje
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                    <h3>Envíenos un Mensaje</h3>

                                    {submitStatus === 'error' && (
                                        <div className={styles.errorAlert}>
                                            <AlertCircle size={20} />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <div className={styles.field}>
                                        <label htmlFor="nombre">Nombre *</label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            placeholder="Su nombre"
                                            {...register('nombre')}
                                            className={errors.nombre ? styles.inputError : ''}
                                        />
                                        {errors.nombre && <span className={styles.error}>{errors.nombre.message}</span>}
                                    </div>

                                    <div className={styles.field}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="correo@ejemplo.com"
                                            {...register('email')}
                                            className={errors.email ? styles.inputError : ''}
                                        />
                                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                                    </div>

                                    <div className={styles.field}>
                                        <label htmlFor="telefono">Teléfono (opcional)</label>
                                        <input
                                            id="telefono"
                                            type="tel"
                                            placeholder="+56 9 1234 5678"
                                            {...register('telefono')}
                                        />
                                    </div>

                                    <div className={styles.field}>
                                        <label htmlFor="mensaje">Mensaje *</label>
                                        <textarea
                                            id="mensaje"
                                            rows={5}
                                            placeholder="¿En qué podemos ayudarle?"
                                            {...register('mensaje')}
                                            className={errors.mensaje ? styles.inputError : ''}
                                        />
                                        {errors.mensaje && <span className={styles.error}>{errors.mensaje.message}</span>}
                                    </div>

                                    <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} fullWidth>
                                        {isSubmitting ? 'Enviando...' : (
                                            <>
                                                Enviar Mensaje
                                                <Send size={20} />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className={styles.mapSection}>
                <div className={styles.mapPlaceholder}>
                    <MapPin size={48} />
                    <span>Mapa de Ubicación</span>
                    <p>Av. Principal 1234, Santiago, Chile</p>
                </div>
            </section>
        </div>
    );
}
