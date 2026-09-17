import React from 'react';
import { experiences, education, skills } from '../data/trajectoryData';
import { BriefcaseSquareIcon, AcademicCapIcon, ZapIcon } from '../components/Icons';

const TrajectorySection = () => {
    return (
        <section className="min-h-screen text-gray-800 dark:text-white pt-20 pb-28 flex items-center justify-center">
            {/* CONTENEDOR HEADER Y HERO */}
            <div className="max-w-7xl w-full mx-auto px-6 sm:px-12">
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Mi Trayectoria <span className="text-blue-600 dark:text-blue-500">Profesional</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-2">
                        Un recorrido síntesis de mi experiencia técnica, evolución académica y competencias clave.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                    <div className="lg:col-span-7 bg-white dark:bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-sm flex flex-col justify-between">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2.5 text-gray-900 dark:text-white">
                            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
                                <BriefcaseSquareIcon className="w-4 h-4" />
                            </div>
                            Experiencia Laboral
                        </h3>

                        <div className="flex-1 flex flex-col justify-center my-auto">
                            <div className="relative border-l-2 border-blue-500/30 dark:border-blue-500/20 ml-3 space-y-8">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                                        {/* PUNTO CONECTOR LINEA DE TIEMPO */}
                                        <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-500 group-hover:scale-125 group-hover:bg-blue-600 transition-all duration-300 shadow-sm"></span>

                                        <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-500/40 hover:shadow-sm transition-all duration-300">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <h4 className="text-base font-bold text-gray-900 dark:text-white">
                                                    {exp.title} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">| {exp.company}</span>
                                                </h4>
                                                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
                                                    {exp.date}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FORMACIÓN + HABILIDADES */}
                    <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                        {/* FORMACIÓN ACADEMICA */}
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-sm">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2.5 text-gray-900 dark:text-white">
                                <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
                                    <AcademicCapIcon className="w-4 h-4" />
                                </div>
                                Formación Académica
                            </h3>

                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/50 dark:border-gray-600/50">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                                                    {edu.degree}
                                                </h4>
                                                {edu.mention && (
                                                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                                                        {edu.mention}
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-[9px] font-bold uppercase bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                {edu.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] text-gray-500 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200/40 dark:border-gray-600/40">
                                            <span>{edu.institution}</span>
                                            <span>{edu.years}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* HABILIDADES CLAVES */}
                        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-sm">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2.5 text-gray-900 dark:text-white">
                                <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm">
                                    <ZapIcon className="w-4 h-4" />
                                </div>
                                Competencias
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 mb-2">
                                        Especialidad Técnica
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.technical.map((skill) => (
                                            <span 
                                                key={skill} 
                                                className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                                                >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 mb-2">
                                        Blandas / Profesionales
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.soft.map((skill) => (
                                            <span 
                                                key={skill} 
                                                className="bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-lg"
                                                >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrajectorySection;