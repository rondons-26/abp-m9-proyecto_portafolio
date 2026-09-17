import React from 'react';
import { skillsData, iconMap } from '../data/skillsData';

const SkillsSection = () => {
    return (
        <div className="min-h-screen text-gray-800 dark:text-white pt-20 pb-28 flex flex-col justify-center">
            <div className="max-w-7xl w-full mx-auto px-6 sm:px-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
                    Mi <span className="text-blue-600 dark:text-blue-500">Stack Tecnológico</span>
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-12 text-sm sm:text-base">
                    Tecnologías, lenguajes y herramientas que utilizo para construir soluciones web escalables y eficientes.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(skillsData).map(([category, items]) => (
                        <div 
                            key={category} 
                            className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700/80 shadow-sm hover:border-blue-500/50 transition-colors duration-300"
                            >
                            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-500 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
                                {category}
                            </h3>
              
                            <div className="flex flex-wrap gap-3">
                                {items.map(item => {
                                    const IconComponent = iconMap[item];

                                    return (
                                        <span 
                                            key={item} 
                                            className="flex items-center space-x-2.5 bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-gray-600/40 transition-all duration-200 transform hover:-translate-y-0.5"
                                            >
                                            {IconComponent && <IconComponent className="w-5 h-5 flex-shrink-0" />}
                                            <span>{item}</span>
                                        </span>
                                    );
                                })}     
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsSection;