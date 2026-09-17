import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Por favor, completa todos los campos.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });

    try {
      // Guardado directo en PostgreSQL via Supabase SDK
      const { error: dbError } = await supabase
        .from('mensajes_contacto')
        .insert([
          { 
            nombre: formData.name, 
            email: formData.email, 
            mensaje: formData.message 
          }
        ]);

      if (dbError) throw dbError;

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error al guardar contacto:', err);
      setStatus({ loading: false, success: false, error: 'Ocurrió un error al enviar tu mensaje.' });
    }
  };

  return (
    <section id="contact" className="py-20 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Contacto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Escribe tu mensaje..."
            ></textarea>
          </div>

          {status.error && <p className="text-red-500 text-sm">{status.error}</p>}
          {status.success && <p className="text-green-500 text-sm">¡Mensaje enviado y guardado correctamente!</p>}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            {status.loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;