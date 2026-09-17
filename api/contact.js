import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

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
  const gmailPass = nodeEnv.GMAIL_PASS || '';

  const supabaseUrl = rawUrl.trim();
  const supabaseKey = rawKey.trim();

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Configuración del transporte SMTP con Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saulrondon077@gmail.com',
      pass: gmailPass.trim(),
    },
  });

  try {
    // 1. Guardar mensaje en PostgreSQL (Supabase)
    const { error: dbError } = await supabase
      .from('mensajes_contacto')
      .insert([{ nombre: name, email, mensaje: message }]);

    if (dbError) throw dbError;

    const messageId = Date.now().toString().slice(-4);

    // 2. Enviar notificación a tu correo personal (Tarjeta Estilizada)
    await transporter.sendMail({
      from: '"Portafolio Web" <saulrondon077@gmail.com>',
      to: 'saulrondon077@gmail.com',
      replyTo: email,
      subject: `[#${messageId}] Nuevo mensaje de ${name}`,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Notificación de Contacto</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #e2e8f0; font-family: Helvetica, Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
            <tr>
              <td align="center" style="padding: 10px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1;">
                  <tr>
                    <td bgcolor="#0f172a" style="padding: 25px 30px; text-align: left;">
                      <h1 style="color: #ffffff; font-size: 18px; margin: 0; font-weight: bold; letter-spacing: 0.5px;">PORTAFOLIO WEB</h1>
                      <p style="color: #38bdf8; font-size: 13px; margin: 5px 0 0 0;">Nuevo mensaje de contacto recibido</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="padding-bottom: 15px;">
                            <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 3px;">REMITENTE</span>
                            <span style="font-size: 16px; color: #0f172a; font-weight: bold;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 3px;">CORREO DE CONTACTO</span>
                            <a href="mailto:${email}" style="font-size: 15px; color: #2563eb; text-decoration: none; font-weight: bold;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 25px;">
                            <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 5px;">MENSAJE</span>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td bgcolor="#f8fafc" style="padding: 15px; border-left: 4px solid #2563eb; font-size: 14px; color: #334155; line-height: 1.5;">
                                  ${message}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#2563eb" style="border-radius: 6px;">
                                  <a href="mailto:${email}?subject=Re: Mensaje desde el Portafolio" target="_blank" style="font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 20px; display: inline-block;">
                                    Responder directamente a ${name}
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#f1f5f9" style="padding: 15px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0; font-size: 12px; color: #64748b;">Notificación enviada desde el Portafolio Profesional</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    // 3. Autorespuesta automática hacia el USUARIO (Sin restricciones)
    await transporter.sendMail({
      from: '"Saúl Rondón | Portafolio" <saulrondon077@gmail.com>',
      to: email,
      subject: `Hemos recibido tu mensaje, ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; color: #1e293b;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h2 style="color: #2563eb; margin-top: 0;">¡Gracias por contactarme!</h2>
            <p>Hola <strong>${name}</strong>,</p>
            <p>Confirmo que he recibido tu mensaje correctamente. Me pondré en contacto contigo a la brevedad posible.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Atentamente,<br /><strong>Saúl Rondón Espinosa</strong><br />Full Stack Developer</p>
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true, message: 'Mensaje enviado y guardado correctamente.' });
  } catch (err) {
    console.error('Error al procesar contacto:', err);
    return res.status(500).json({ error: 'Ocurrió un error al procesar tu solicitud.', details: err.message });
  }
}