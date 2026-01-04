import nodemailer from 'nodemailer';
import type { CotizacionFormData, ContactoFormData } from './validations';

// Configuración del transporter
// En producción, usar variables de entorno reales
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const EMAIL_TO = process.env.EMAIL_TO || 'cotizaciones@constructoravincent.cl';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@constructoravincent.cl';

export async function sendCotizacionEmail(data: CotizacionFormData) {
    const tipoProyectoLabels: Record<string, string> = {
        hospital: 'Construcción Hospitalaria',
        comercial: 'Edificio Comercial',
        residencial: 'Proyecto Residencial',
        industrial: 'Nave Industrial',
        remodelacion: 'Remodelación',
        otro: 'Otro',
    };

    const presupuestoLabels: Record<string, string> = {
        'menos-50m': 'Menos de $50 millones',
        '50m-100m': '$50 - $100 millones',
        '100m-500m': '$100 - $500 millones',
        '500m-1b': '$500 millones - $1.000 millones',
        'mas-1b': 'Más de $1.000 millones',
    };

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2c5282); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f8f9fa; padding: 20px; border: 1px solid #e2e8f0; }
        .field { margin-bottom: 16px; }
        .label { font-weight: bold; color: #1a365d; display: block; margin-bottom: 4px; }
        .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0; }
        .footer { background: #1a365d; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        .highlight { background: #c9a227; color: white; padding: 2px 8px; border-radius: 4px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏗️ Nueva Solicitud de Cotización</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Nombre:</span>
            <div class="value">${data.nombre}</div>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <span class="label">Teléfono:</span>
            <div class="value"><a href="tel:${data.telefono}">${data.telefono}</a></div>
          </div>
          ${data.empresa ? `
          <div class="field">
            <span class="label">Empresa:</span>
            <div class="value">${data.empresa}</div>
          </div>
          ` : ''}
          <div class="field">
            <span class="label">Tipo de Proyecto:</span>
            <div class="value"><span class="highlight">${tipoProyectoLabels[data.tipoProyecto]}</span></div>
          </div>
          <div class="field">
            <span class="label">Presupuesto Estimado:</span>
            <div class="value">${presupuestoLabels[data.presupuesto]}</div>
          </div>
          ${data.plazo ? `
          <div class="field">
            <span class="label">Plazo Deseado:</span>
            <div class="value">${data.plazo}</div>
          </div>
          ` : ''}
          <div class="field">
            <span class="label">Descripción del Proyecto:</span>
            <div class="value">${data.descripcion.replace(/\n/g, '<br>')}</div>
          </div>
          ${data.comoNosConocio ? `
          <div class="field">
            <span class="label">¿Cómo nos conoció?:</span>
            <div class="value">${data.comoNosConocio}</div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>Este mensaje fue enviado desde el formulario de cotización de constructoravincent.cl</p>
        </div>
      </div>
    </body>
    </html>
  `;

    await transporter.sendMail({
        from: `"Constructora Vincent Web" <${EMAIL_FROM}>`,
        to: EMAIL_TO,
        subject: `Nueva Cotización: ${tipoProyectoLabels[data.tipoProyecto]} - ${data.nombre}`,
        html: htmlContent,
        replyTo: data.email,
    });
}

export async function sendContactoEmail(data: ContactoFormData) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a365d, #2c5282); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f8f9fa; padding: 20px; border: 1px solid #e2e8f0; }
        .field { margin-bottom: 16px; }
        .label { font-weight: bold; color: #1a365d; }
        .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0; margin-top: 4px; }
        .footer { background: #1a365d; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Nuevo Mensaje de Contacto</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Nombre:</span>
            <div class="value">${data.nombre}</div>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ${data.telefono ? `
          <div class="field">
            <span class="label">Teléfono:</span>
            <div class="value">${data.telefono}</div>
          </div>
          ` : ''}
          <div class="field">
            <span class="label">Mensaje:</span>
            <div class="value">${data.mensaje.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>Este mensaje fue enviado desde el formulario de contacto de constructoravincent.cl</p>
        </div>
      </div>
    </body>
    </html>
  `;

    await transporter.sendMail({
        from: `"Constructora Vincent Web" <${EMAIL_FROM}>`,
        to: EMAIL_TO,
        subject: `Mensaje de Contacto: ${data.nombre}`,
        html: htmlContent,
        replyTo: data.email,
    });
}
