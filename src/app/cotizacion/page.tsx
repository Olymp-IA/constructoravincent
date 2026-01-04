'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Building2, Phone, Mail, Clock } from 'lucide-react';
import { cotizacionSchema, type CotizacionFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

const tipoProyectoOptions = [
    { value: 'hospital', label: 'Construcción Hospitalaria' },
    { value: 'comercial', label: 'Edificio Comercial' },
    { value: 'residencial', label: 'Proyecto Residencial' },
    { value: 'industrial', label: 'Nave Industrial' },
    { value: 'remodelacion', label: 'Remodelación' },
    { value: 'otro', label: 'Otro' },
];

const presupuestoOptions = [
    { value: 'menos-50m', label: 'Menos de $50 millones' },
    { value: '50m-100m', label: '$50 - $100 millones' },
    { value: '100m-500m', label: '$100 - $500 millones' },
    { value: '500m-1b', label: '$500 millones - $1.000 millones' },
    { value: 'mas-1b', label: 'Más de $1.000 millones' },
];

export default function CotizacionPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CotizacionFormData>({
        resolver: zodResolver(cotizacionSchema),
    });

    const onSubmit = async (data: CotizacionFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'cotizacion', data }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.message || 'Error al enviar la cotización');
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
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroBackground} />
                <div className={`container ${styles.heroContent}`}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Solicitar Cotización
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Complete el formulario y nuestro equipo se pondrá en contacto con usted
                        en menos de 24 horas hábiles.
                    </motion.p>
                </div>
            </section>

            {/* Form Section */}
            <section className={`section ${styles.formSection}`}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Form */}
                        <motion.div
                            className={styles.formWrapper}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {submitStatus === 'success' ? (
                                <motion.div
                                    className={styles.successMessage}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <CheckCircle size={64} />
                                    <h2>¡Solicitud Enviada!</h2>
                                    <p>
                                        Gracias por contactarnos. Nuestro equipo revisará su solicitud y
                                        se pondrá en contacto con usted a la brevedad.
                                    </p>
                                    <Button onClick={() => setSubmitStatus('idle')} variant="primary">
                                        Enviar otra cotización
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                                    <h2 className={styles.formTitle}>Información del Proyecto</h2>

                                    {submitStatus === 'error' && (
                                        <div className={styles.errorAlert}>
                                            <AlertCircle size={20} />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <div className={styles.formGrid}>
                                        {/* Nombre */}
                                        <div className={styles.field}>
                                            <label htmlFor="nombre">Nombre Completo *</label>
                                            <input
                                                id="nombre"
                                                type="text"
                                                placeholder="Ej: Juan Pérez"
                                                {...register('nombre')}
                                                className={errors.nombre ? styles.inputError : ''}
                                            />
                                            {errors.nombre && <span className={styles.error}>{errors.nombre.message}</span>}
                                        </div>

                                        {/* Email */}
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

                                        {/* Teléfono */}
                                        <div className={styles.field}>
                                            <label htmlFor="telefono">Teléfono *</label>
                                            <input
                                                id="telefono"
                                                type="tel"
                                                placeholder="+56 9 1234 5678"
                                                {...register('telefono')}
                                                className={errors.telefono ? styles.inputError : ''}
                                            />
                                            {errors.telefono && <span className={styles.error}>{errors.telefono.message}</span>}
                                        </div>

                                        {/* Empresa */}
                                        <div className={styles.field}>
                                            <label htmlFor="empresa">Empresa (opcional)</label>
                                            <input
                                                id="empresa"
                                                type="text"
                                                placeholder="Nombre de su empresa"
                                                {...register('empresa')}
                                            />
                                        </div>

                                        {/* Tipo de Proyecto */}
                                        <div className={styles.field}>
                                            <label htmlFor="tipoProyecto">Tipo de Proyecto *</label>
                                            <select
                                                id="tipoProyecto"
                                                {...register('tipoProyecto')}
                                                className={errors.tipoProyecto ? styles.inputError : ''}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                {tipoProyectoOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.tipoProyecto && <span className={styles.error}>{errors.tipoProyecto.message}</span>}
                                        </div>

                                        {/* Presupuesto */}
                                        <div className={styles.field}>
                                            <label htmlFor="presupuesto">Presupuesto Estimado *</label>
                                            <select
                                                id="presupuesto"
                                                {...register('presupuesto')}
                                                className={errors.presupuesto ? styles.inputError : ''}
                                            >
                                                <option value="">Seleccione un rango</option>
                                                {presupuestoOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.presupuesto && <span className={styles.error}>{errors.presupuesto.message}</span>}
                                        </div>

                                        {/* Plazo */}
                                        <div className={styles.field}>
                                            <label htmlFor="plazo">Plazo Deseado (opcional)</label>
                                            <input
                                                id="plazo"
                                                type="text"
                                                placeholder="Ej: 6 meses, 1 año"
                                                {...register('plazo')}
                                            />
                                        </div>

                                        {/* Cómo nos conoció */}
                                        <div className={styles.field}>
                                            <label htmlFor="comoNosConocio">¿Cómo nos conoció? (opcional)</label>
                                            <input
                                                id="comoNosConocio"
                                                type="text"
                                                placeholder="Ej: Google, Referido, Redes sociales"
                                                {...register('comoNosConocio')}
                                            />
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <div className={styles.field}>
                                        <label htmlFor="descripcion">Descripción del Proyecto *</label>
                                        <textarea
                                            id="descripcion"
                                            rows={5}
                                            placeholder="Describa su proyecto, ubicación, metros cuadrados aproximados, características especiales, etc."
                                            {...register('descripcion')}
                                            className={errors.descripcion ? styles.inputError : ''}
                                        />
                                        {errors.descripcion && <span className={styles.error}>{errors.descripcion.message}</span>}
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        disabled={isSubmitting}
                                        fullWidth
                                    >
                                        {isSubmitting ? (
                                            <>Enviando...</>
                                        ) : (
                                            <>
                                                Enviar Solicitud
                                                <Send size={20} />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            className={styles.sidebar}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className={styles.infoCard}>
                                <h3>¿Por qué elegirnos?</h3>
                                <ul className={styles.benefits}>
                                    <li>
                                        <CheckCircle size={20} />
                                        <span>Más de 15 años de experiencia</span>
                                    </li>
                                    <li>
                                        <CheckCircle size={20} />
                                        <span>Especialistas en construcción hospitalaria</span>
                                    </li>
                                    <li>
                                        <CheckCircle size={20} />
                                        <span>Garantía de calidad en materiales</span>
                                    </li>
                                    <li>
                                        <CheckCircle size={20} />
                                        <span>Cumplimiento de plazos</span>
                                    </li>
                                    <li>
                                        <CheckCircle size={20} />
                                        <span>Asesoría técnica incluida</span>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.contactCard}>
                                <h3>Contacto Directo</h3>
                                <ul className={styles.contactList}>
                                    <li>
                                        <Phone size={18} />
                                        <a href="tel:+56912345678">+56 9 1234 5678</a>
                                    </li>
                                    <li>
                                        <Mail size={18} />
                                        <a href="mailto:cotizaciones@constructoravincent.cl">cotizaciones@constructoravincent.cl</a>
                                    </li>
                                    <li>
                                        <Clock size={18} />
                                        <span>Lun - Vie: 8:00 - 18:00</span>
                                    </li>
                                    <li>
                                        <Building2 size={18} />
                                        <span>Av. Principal 1234, Santiago</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
