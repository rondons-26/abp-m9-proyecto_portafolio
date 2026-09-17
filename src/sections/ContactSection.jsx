import React from 'react';
import { LinkedinIcon, GithubIcon, MailIcon } from '../components/Icons';
import { useContactForm } from '../hooks/useContactForm';

const ContactSection = () => {
    const { formData, status, handleChange, handleSubmit } = useContactForm();

    return (
        <div className="min-h-screen text-gray-800 dark:text-white px-6 sm:px-8 pt-24 pb-28 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-5xl w-full mx-auto relative z-10 space-y-12">
                {/* ENCABEZADO */}
                <div className="text-center space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                        ¿Tienes una propuesta o proyecto? <br />
                        <span className="text-blue-600 dark:text-blue-500">Hablemos hoy.</span>
                    </h2>

                    <div className="flex flex-wrap justify-center items-center gap-4 text-xs sm:text-sm pt-2">
                        <a 
                            href="mailto:saulrondon077@gmail.com" 
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:border-blue-500 transition-colors"
                            >
                            <MailIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold">saulrondon077@gmail.com</span>
                        </a>

                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="font-medium">Disponible para Oportunidades</span>
                        </div>
                    </div>
                </div>

                {/* CONTENEDOR DEL FOMULARIO */}
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl space-y-5">
                        {status.error && (
                            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl text-xs sm:text-sm font-medium">
                                {status.error}
                            </div>
                        )}

                        {status.success && (
                            <div className="p-3.5 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 text-green-600 dark:text-green-400 rounded-xl text-xs sm:text-sm font-medium">
                                ¡Mensaje enviado con éxito! Me pondré en contacto contigo a la brevedad.
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1.5">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    className="w-full px-3.5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1.5">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    className="w-full px-3.5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-1.5">Mensaje</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Escribe tu mensaje aquí..."
                                className="w-full px-3.5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status.loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/20 active:scale-[0.99] flex justify-center items-center gap-2 text-sm"
                            >
                            {status.loading ? (
                                <span className="inline-flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                'Enviar Mensaje'
                            )}
                        </button>
                    </form>
                </div>

                {/* REDES PROFESIONALES */}
                <div className="pt-4 text-center">
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-4">También puedes encontrarme en</p>
                    <div className="flex justify-center items-center gap-4">
                        <a 
                            href="https://www.linkedin.com/in/saulrondon/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 py-2.5 px-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-700 dark:text-gray-300 transition-all duration-300 font-medium text-xs sm:text-sm shadow-sm"
                            >
                            <LinkedinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span>LinkedIn</span>
                        </a>

                        <a 
                            href="https://github.com/rondons-26" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 py-2.5 px-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white text-gray-700 dark:text-gray-300 transition-all duration-300 font-medium text-xs sm:text-sm shadow-sm"
                            >
                            <GithubIcon className="w-4 h-4" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;