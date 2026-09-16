import React from 'react';
import { DownloadIcon, CodeIcon } from './Icons';

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-12 py-3 sm:py-4">
      <nav className="flex justify-between items-center w-full">
        <a href="#" className="flex items-center space-x-2 text-gray-800 dark:text-white group">
          <div className="p-1 rounded-md bg-blue-600 dark:bg-blue-500 transition-colors duration-300 transform group-hover:scale-110">
            <CodeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-900" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold transition-transform duration-300 transform group-hover:translate-x-1">Saúl R.</h1>
        </a>
        <a 
          href="/SAÚL_RONDÓN_CV_2025.pdf"
          download="SAÚL_RONDÓN_CV_2025.pdf"
          className="p-1.5 sm:p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors transform hover:scale-105 flex items-center justify-center"
          aria-label="Descargar CV"
        >
          <DownloadIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </nav>
    </div>
  </header>
);

export default Header;