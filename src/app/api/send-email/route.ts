import { NextRequest, NextResponse } from 'next/server';
import { cotizacionSchema, contactoSchema } from '@/lib/validations';
import { sendCotizacionEmail, sendContactoEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, data } = body;

        if (type === 'cotizacion') {
            // Validar datos de cotización
            const validatedData = cotizacionSchema.parse(data);

            // Enviar email
            await sendCotizacionEmail(validatedData);

            return NextResponse.json(
                { success: true, message: 'Cotización enviada correctamente' },
                { status: 200 }
            );
        } else if (type === 'contacto') {
            // Validar datos de contacto
            const validatedData = contactoSchema.parse(data);

            // Enviar email
            await sendContactoEmail(validatedData);

            return NextResponse.json(
                { success: true, message: 'Mensaje enviado correctamente' },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: 'Tipo de formulario no válido' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error al enviar email:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { success: false, message: 'Datos del formulario no válidos', errors: error },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Error al enviar el mensaje. Por favor intente nuevamente.' },
            { status: 500 }
        );
    }
}
