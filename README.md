# Constructora Vincent - Sitio Web Corporativo

> **Ingeniería que Perdura** - Sitio web premium para empresa constructora especializada en infraestructura hospitalaria y obras civiles.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple)

## 🏗️ Descripción

Sitio web corporativo con estética **European Modernism** (Bauhaus/Swiss Design). Diseñado como un manifiesto arquitectónico, no un folleto comercial.

### Filosofía de Diseño
- **Paleta**: Off-White `#f5f3f0` / Antracita `#1a1a1a` / Bronce `#8b6914`
- **Tipografía**: Cinzel (Serif) + Manrope (Sans-Serif)
- **Estética**: Layouts editoriales, mucho espacio negativo, imágenes B&W

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/Olymp-IA/constructoravincent.git
cd constructoravincent

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build && npm start
```

## 📁 Estructura

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── page.tsx           # Página principal
│   ├── nosotros/          # Sobre nosotros
│   ├── servicios/         # Servicios
│   ├── proyectos/         # Portafolio
│   ├── cotizacion/        # Formulario de cotización
│   ├── contacto/          # Contacto
│   └── api/send-email/    # API para emails
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Hero, Services, Projects, CTA
│   └── ui/                # Button, Card, OlympiaFooter
├── lib/                   # Validaciones, email config
└── styles/                # Variables CSS, estilos globales
```

## ⚙️ Configuración de Email

Para habilitar el envío de cotizaciones, crear `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=tu-email@gmail.com
SMTP_PASS=contraseña-de-aplicacion
EMAIL_TO=cotizaciones@constructoravincent.cl
EMAIL_FROM=noreply@constructoravincent.cl
```

## 🎨 Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Hero asimétrico, Servicios, Proyectos, CTA |
| `/nosotros` | Historia, Misión, Visión, Valores, Equipo |
| `/servicios` | 4 servicios con especificaciones técnicas |
| `/proyectos` | Galería filtrable con layout editorial |
| `/cotizacion` | Formulario validado con envío de email |
| `/contacto` | Información de contacto y formulario |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Email**: Nodemailer
- **Iconos**: Lucide React
- **Deploy**: Vercel

## 📱 Responsive

Breakpoints optimizados: 1024px, 768px, 480px

## 🔗 Deploy

Desplegado automáticamente en Vercel conectado a este repositorio.

---

**Powered by [Olymp-IA](https://olymp-ia.cl)** ΩΞ
