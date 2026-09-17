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

    // 2. Notificación con Estilos Inline para compatibilidad total con Gmail
    await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>',
      to: 'saulrondon077@gmail.com',
      replyTo: email,
      subject: `📩 Nuevo mensaje de ${name} | Portafolio Web`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            
            <!-- Cabecera -->
            <tr>
              <td style="background-color: #0f172a; padding: 24px 30px; text-align: left;">
                <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">Nuevo Mensaje de Contacto</h2>
                <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Recibido desde el formulario de tu Portafolio Web</p>
              </td>
            </tr>

            <!-- Cuerpo del mensaje -->
            <tr>
              <td style="padding: 30px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  
                  <tr>
                    <td style="padding-bottom: 20px;">
                      <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.8px; margin-bottom: 4px;">Remitente</div>
                      <div style="font-size: 15px; color: #1e293b; font-weight: 600;">${name}</div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 20px;">
                      <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.8px; margin-bottom: 4px;">Correo Electrónico</div>
                      <div style="font-size: 15px;">
                        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 25px;">
                      <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.8px; margin-bottom: 6px;">Mensaje</div>
                      <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 0 8px 8px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                        ${message}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td align="left">
                      <a href="mailto:${email}?subject=Re: Tu contacto desde el Portafolio" style="background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                        Responder a ${name}
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <!-- Pie de página -->
            <tr>
              <td style="background-color: #f8fafc; padding: 16px 30px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
                Notificación automática del Portafolio • Saúl Rondón Espinosa
              </td>
            </tr>

          </table>
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