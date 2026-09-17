import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import validator from 'validator';

// 1. CONTROL DE TASA
const requestTracker = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
    const now = Date.now();

    if (!requestTracker.has(ip)) {
        requestTracker.set(ip, { count: 1, startTime: now });
        return true;
    }

    const record = requestTracker.get(ip);
    if (now - record.startTime > RATE_LIMIT_WINDOW) {
        requestTracker.set(ip, { count: 1, startTime: now });
        return true;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }

    record.count++;
    return true;
}

export default async function handler(req, res) {
    // PROTECCIÓN CORS
    const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://abp-m9-proyecto-portafolio-rly5pafxy-portafolio-personal2.vercel.app/'
    ];

    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // VALIDAR TASA POR IP
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ 
            error: 'Has enviado demasiados mensajes en poco tiempo. Por favor, intenta más tarde.' 
        });
    }

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // VALIDACIÓN Y SANITIZACIÓN DE INPUTS
    const cleanEmail = validator.normalizeEmail(email.trim());
    if (!validator.isEmail(cleanEmail)) {
        return res.status(400).json({ error: 'El formato del correo electrónico no es válido.' });
    }

    const cleanName = validator.escape(name.trim());
    const cleanMessage = validator.escape(message.trim());

    if (cleanName.length < 2 || cleanName.length > 100) {
        return res.status(400).json({ error: 'El nombre debe tener entre 2 y 100 caracteres.' });
    }

    if (cleanMessage.length < 5 || cleanMessage.length > 2000) {
        return res.status(400).json({ error: 'El mensaje debe tener entre 5 y 2000 caracteres.' });
    }

    const nodeEnv = globalThis.process ? globalThis.process.env : {};

    const rawUrl = nodeEnv.SUPABASE_URL || nodeEnv.VITE_SUPABASE_URL || '';
    const rawKey = nodeEnv.SUPABASE_ANON_KEY || nodeEnv.SUPABASE_KEY || nodeEnv.VITE_SUPABASE_KEY || '';
    const gmailPass = nodeEnv.GMAIL_PASS || '';

    const supabaseUrl = rawUrl.trim();
    const supabaseKey = rawKey.trim();

    const supabase = createClient(supabaseUrl, supabaseKey);

    // CONFIGURACIÓN SMTP CON GMAIL
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saulrondon077@gmail.com',
            pass: gmailPass.trim(),
        },
    });

    try {
        // 1. GUARDAR MENSAJE SANITIZADO EN PostgreSQL (SUPABASE)
        const { error: dbError } = await supabase
        .from('mensajes_contacto')
        .insert([{ nombre: cleanName, email: cleanEmail, mensaje: cleanMessage }]);

        if (dbError) throw dbError;

        const messageId = Date.now().toString().slice(-4);

        // 2. NOTIFICACIÓN CORREO PERSONAL
        await transporter.sendMail({
            from: '"Portafolio Web" <saulrondon077@gmail.com>',
            to: 'saulrondon077@gmail.com',
            replyTo: cleanEmail,
            subject: `[#${messageId}] Nuevo mensaje de ${cleanName}`,
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
                                                            <span style="font-size: 16px; color: #0f172a; font-weight: bold;">${cleanName}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 20px;">
                                                            <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 3px;">CORREO DE CONTACTO</span>
                                                            <a href="mailto:${cleanEmail}" style="font-size: 15px; color: #2563eb; text-decoration: none; font-weight: bold;">${cleanEmail}</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-bottom: 25px;">
                                                            <span style="font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 5px;">MENSAJE</span>
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                <tr>
                                                                    <td bgcolor="#f8fafc" style="padding: 15px; border-left: 4px solid #2563eb; font-size: 14px; color: #334155; line-height: 1.5;">
                                                                        ${cleanMessage}
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
                                                                        <a href="mailto:${cleanEmail}?subject=Re: Mensaje desde el Portafolio" target="_blank" style="font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 20px; display: inline-block;">
                                                                            Responder directamente a ${cleanName}
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

        // 3. AUTORESPUESTA AUTOMÁTICA HACIA EL USUARIO
        await transporter.sendMail({
            from: '"Saúl Rondón | Portafolio" <saulrondon077@gmail.com>',
            to: cleanEmail,
            subject: `Hemos recibido tu mensaje, ${cleanName}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; color: #1e293b;">
                    <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <h2 style="color: #2563eb; margin-top: 0;">¡Gracias por contactarme!</h2>
                        <p>Hola <strong>${cleanName}</strong>,</p>
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