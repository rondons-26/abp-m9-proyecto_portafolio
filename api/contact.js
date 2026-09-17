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

  const rawUrl = nodeEnv.SUPABASE_URL || nodeEnv.VITE_SUPABASE_URL || '';
  const rawKey = nodeEnv.SUPABASE_ANON_KEY || nodeEnv.SUPABASE_KEY || nodeEnv.VITE_SUPABASE_KEY || '';
  const rawResend = nodeEnv.RESEND_API_KEY || nodeEnv.VITE_RESEND_API_KEY || '';

  const supabaseUrl = rawUrl.trim();
  const supabaseKey = rawKey.trim();
  const resendApiKey = rawResend.trim();

  // 1. Guardar en Supabase
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error: dbError } = await supabase
      .from('mensajes_contacto')
      .insert([{ nombre: name, email, mensaje: message }]);

    if (dbError) {
      console.error('Error Supabase:', dbError);
    }
  } catch (dbErr) {
    console.error('Excepción Supabase:', dbErr.message);
  }

  // 2. Enviar Correo con Resend
  try {
    if (!resendApiKey) {
      throw new Error('No se encontró la variable RESEND_API_KEY en Vercel.');
    }

    const resend = new Resend(resendApiKey);
    const emailResult = await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: 'saulrondon077@gmail.com',
      subject: `Nuevo mensaje de ${name} desde el Portafolio`,
      html: `
        <h3>Nuevo mensaje recibido</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `
    });

    console.log('Resultado Resend:', emailResult);
  } catch (mailErr) {
    console.error('Error Resend:', mailErr.message);
    return res.status(500).json({ 
      error: 'El mensaje se guardó en BD, pero falló el envío de correo.', 
      details: mailErr.message 
    });
  }

  return res.status(200).json({ success: true, message: 'Proceso completado correctamente.' });
}