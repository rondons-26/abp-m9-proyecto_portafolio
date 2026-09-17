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

  const supabase = createClient(supabaseUrl, supabaseKey);
  const resend = new Resend(resendApiKey);

  try {
    // 1. Guardar mensaje en PostgreSQL (Supabase)
    const { error: dbError } = await supabase
      .from('mensajes_contacto')
      .insert([{ nombre: name, email, mensaje: message }]);

    if (dbError) throw dbError;

    // 2. Notificación con Plantilla HTML Profesional
    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: 'saulrondon077@gmail.com',
      replyTo: email,
      subject: `📩 Nuevo mensaje de ${name} | Portafolio Web`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
            .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
            .header { background: #0f172a; padding: 24px 30px; text-align: left; }
            .header h2 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.3px; }
            .header p { color: #94a3b8; margin: 4px 0 0 0; font-size: 13px; }
            .content { padding: 30px; }
            .field-group { margin-bottom: 20px; }
            .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.8px; margin-bottom: 4px; }
            .value { font-size: 15px; color: #1e293b; font-weight: 500; }
            .message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap; margin-top: 6px; }
            .action-btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-top: 20px; }
            .footer { background: #f8fafc; padding: 16px 30px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2>Nuevo Mensaje de Contacto</h2>
              <p>Recibido desde el formulario de tu Portafolio Web</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Remitente</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-group">
                <div class="label">Correo Electrónico</div>
                <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Mensaje</div>
                <div class="message-box">${message}</div>
              </div>
              <a href="mailto:${email}?subject=Re: Tu contacto desde el Portafolio" class="action-btn">Responder a ${name}</a>
            </div>
            <div class="footer">
              Notificación automática del Portafolio • Saúl Rondón Espinosa
            </div>
          </div>
        </body>
        </html>
      `
    });

    return res.status(200).json({ success: true, message: 'Mensaje enviado y guardado correctamente.' });
  } catch (err) {
    console.error('Error al procesar contacto:', err);
    return res.status(500).json({ error: 'Ocurrió un error al procesar tu solicitud.', details: err.message });
  }
}