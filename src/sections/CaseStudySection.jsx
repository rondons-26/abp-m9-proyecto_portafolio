import React from 'react';
import { caseStudyData } from '../data/caseStudyData';

const CaseStudySection = () => {
  const { title, subtitle, challenge, solution, metrics, technologies, justification } = caseStudyData;

  return (
    <section className="min-h-screen text-gray-800 dark:text-white px-6 sm:px-12 pt-24 pb-28 max-w-6xl mx-auto">
      {/* Header de la sección */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Tarjetas de Desafío y Solución */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800/80 p-6 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-sm">
          <h3 className="text-base font-semibold text-red-500 dark:text-red-400 mb-2 flex items-center gap-2">
            Desafío Técnico
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {challenge}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800/80 p-6 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-sm">
          <h3 className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
            Solución Implementada
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {solution}
          </p>
        </div>
      </div>

      {/* Banner de Métricas */}
      <div className="bg-blue-600 dark:bg-blue-600 text-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
                {item.value}
              </span>
              <span className="text-xs text-blue-100 font-medium uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenedor de Stack y Justificación */}
      <div className="bg-white dark:bg-gray-800/80 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-700/60 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Herramientas Técnicas Aplicadas
          </h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-600/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-700/50" />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            ¿Por qué forma parte del portafolio?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {justification}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;