import React, { useState } from 'react';
import { projects } from '../data/projectsData';
import { GithubIcon } from '../components/Icons';

const ProjectsSection = () => {
    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (id) => {
        setFlippedCards((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="min-h-screen text-gray-800 dark:text-white pt-28 pb-28">
            <div className="max-w-7xl w-full mx-auto px-6 sm:px-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
                    Proyectos <span className="text-blue-600 dark:text-blue-500">Destacados</span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-12 text-sm sm:text-base">
                    Productos digitales construidos aplicando buenas prácticas de desarrollo software, rendimiento y arquitectura web.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => {
                        const isFlipped = flippedCards[project.id];

                        return (
                            <div 
                                key={project.id} 
                                className="perspective-1000 h-[390px] w-full"
                            >
                                <div 
                                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                                        isFlipped ? 'rotate-y-180' : ''
                                    }`}
                                >
                                    {/* --- FRENTE DE LA TARJETA --- */}
                                    <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden flex flex-col">
                                        <img 
                                            src={project.image} 
                                            alt={`Captura del proyecto ${project.title}`} 
                                            className="w-full h-48 object-cover flex-shrink-0" 
                                        />
                                        
                                        <div className="p-6 flex flex-col justify-center items-center flex-grow text-center gap-4 min-w-0">
                                            <h3 
                                                className="w-full text-sm sm:text-base font-bold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis px-1"
                                                title={project.title}
                                            >
                                                {project.title}
                                            </h3>

                                            <button
                                                onClick={() => toggleFlip(project.id)}
                                                className="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm shadow-sm"
                                            >
                                                <span>Más información</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* --- REVERSO DE LA TARJETA --- */}
                                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-gray-800 rounded-2xl border border-blue-500/30 dark:border-blue-400/30 shadow-xl p-6 flex flex-col justify-between text-left">
                                        <div className="flex flex-col flex-grow justify-start overflow-hidden min-w-0">
                                            <h3 
                                                className="w-full text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis mb-3"
                                                title={project.title}
                                            >
                                                {project.title}
                                            </h3>

                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="mb-3">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Mi Rol:</p>
                                                <p className="text-sm text-gray-800 dark:text-gray-200">{project.role}</p>
                                            </div>

                                            <div className="mb-2">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tecnologías:</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.tech.map((t) => (
                                                        <span 
                                                            key={t} 
                                                            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-600"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- BOTONES DE ACCIÓN --- */}
                                        <div className="flex items-center space-x-2 pt-3 border-t border-gray-100 dark:border-gray-700/60 mt-auto">
                                            <a 
                                                href={project.github} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold h-10 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full flex items-center justify-center gap-2 text-xs sm:text-sm"
                                            >
                                                <GithubIcon className="w-4 h-4" />
                                                <span>GitHub</span>
                                            </a>

                                            <a 
                                                href={project.demo} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="bg-blue-600 text-white font-semibold h-10 px-3 rounded-lg hover:bg-blue-700 transition-colors w-full flex items-center justify-center gap-2 text-xs sm:text-sm"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span>Demo</span>
                                            </a>

                                            <button
                                                onClick={() => toggleFlip(project.id)}
                                                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 h-10 w-10 min-w-[40px] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                                                title="Volver al frente"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectsSection;