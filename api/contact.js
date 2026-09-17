import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const nodeEnv = globalThis.process ? globalThis.process.env : {};

  // Busca el valor en SUPABASE_URL o VITE_SUPABASE_URL y aplica .trim() para evitar el error PGRST125
  const rawUrl = nodeEnv.SUPABASE_URL || nodeEnv.VITE_SUPABASE_URL || '';
  const rawKey = nodeEnv.SUPABASE_ANON_KEY || nodeEnv.SUPABASE_KEY || nodeEnv.VITE_SUPABASE_KEY || '';
  const rawResend = nodeEnv.RESEND_API_KEY || nodeEnv.VITE_RESEND_API_KEY || '';

  const supabaseUrl = rawUrl.trim();
  const supabaseKey = rawKey.trim();
  const resendApiKey = rawResend.trim();

  const supabase = createClient(supabaseUrl, supabaseKey);
  const resend = new Resend(resendApiKey);

  try {
    // 1. Guardar mensaje en PostgreSQL (Supabase)
    const { error: dbError } = await supabase
      .from('mensajes_contacto')
      .insert([{ nombre: name, email, mensaje: message }]);

    if (dbError) {
      throw dbError;
    }

    // 2. Notificación a tu correo personal
    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: 'rondonsaul14@gmail.com',
      subject: `Nuevo mensaje de ${name} desde el Portafolio`,
      html: `
        <h3>Nuevo mensaje recibido</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    });

    return res.status(200).json({ success: true, message: 'Mensaje enviado y guardado correctamente.' });
  } catch (err) {
    console.error('Error al procesar contacto:', err);
    return res.status(500).json({ error: 'Ocurrió un error al procesar tu solicitud.', details: err.message });
  }
}