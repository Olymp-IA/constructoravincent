import { z } from 'zod';

export const cotizacionSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Ingrese un email válido'),
    telefono: z.string().min(8, 'Ingrese un teléfono válido'),
    empresa: z.string().optional(),
    tipoProyecto: z.enum(['hospital', 'comercial', 'residencial', 'industrial', 'remodelacion', 'otro'], {
        message: 'Seleccione un tipo de proyecto',
    }),
    descripcion: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
    presupuesto: z.enum(['menos-50m', '50m-100m', '100m-500m', '500m-1b', 'mas-1b'], {
        message: 'Seleccione un rango de presupuesto',
    }),
    plazo: z.string().optional(),
    comoNosConocio: z.string().optional(),
});


export type CotizacionFormData = z.infer<typeof cotizacionSchema>;

export const contactoSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Ingrese un email válido'),
    telefono: z.string().optional(),
    mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export type ContactoFormData = z.infer<typeof contactoSchema>;
