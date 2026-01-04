import Link from 'next/link';
import styles from './Footer.module.css';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Estudio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/proyectos', label: 'Proyectos' },
    { href: '/contacto', label: 'Contacto' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                {/* Grid principal */}
                <div className={styles.grid}>
                    {/* Logo y descripción */}
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <span className={styles.logoText}>VINCENT</span>
                            <span className={styles.logoSub}>CONSTRUCTORA</span>
                        </div>
                        <p className={styles.description}>
                            Especialistas en infraestructura hospitalaria y obras civiles
                            de alta complejidad. Más de 15 años construyendo con excelencia.
                        </p>
                    </div>

                    {/* Navegación */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Navegación</h4>
                        <nav className={styles.nav}>
                            {navLinks.map((link, index) => (
                                <Link key={link.href} href={link.href} className={styles.navLink}>
                                    <span className={styles.navNumber}>0{index + 1}</span>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contacto */}
                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Contacto</h4>
                        <address className={styles.contact}>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Dirección</span>
                                <span>Av. Principal 1234, Piso 10</span>
                                <span>Santiago, Chile</span>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Teléfono</span>
                                <a href="tel:+56212345678">+56 2 1234 5678</a>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactLabel}>Email</span>
                                <a href="mailto:contacto@constructoravincent.cl">contacto@constructoravincent.cl</a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Línea divisora */}
                <div className={styles.divider} />

                {/* Bottom */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Constructora Vincent. Todos los derechos reservados.
                    </p>
                    <div className={styles.legal}>
                        <Link href="/privacidad">Privacidad</Link>
                        <Link href="/terminos">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
