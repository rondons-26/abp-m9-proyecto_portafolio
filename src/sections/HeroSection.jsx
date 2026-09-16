import React, { useEffect, useState } from 'react';
import Foto from '../img/inicio.jpg';

const HeroSection = ({ onNavigate }) => {
    const phrases = [
        "desarrollarlo",
        "hacerlo realidad",
        "crearlo",
    ];

    const [currentPhrase, setCurrentPhrase] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const fullPhrase = phrases[phraseIndex];

            if (isDeleting) {
                setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length - 1));
                setTypingSpeed(50);
            } else {
                setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && currentPhrase === fullPhrase) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentPhrase === '') {
                setIsDeleting(false);
                setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentPhrase, isDeleting, phraseIndex, typingSpeed, phrases]);

    return (
        <div className="flex items-center justify-center min-h-screen text-gray-800 dark:text-white pt-20 pb-28">
            <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                
                {/* Contenido Texto */}
                <div className="text-center md:text-left z-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        Si puedes pensarlo, <br /> 
                        <span className="text-blue-600 dark:text-blue-500 inline-flex items-center whitespace-nowrap h-[1.3em]">
                            puedes {currentPhrase}<span className="animate-pulse ml-0.5">|</span>
                        </span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto md:mx-0 text-sm sm:text-base">
                        Como desarrollador frontend y creador de contenido, me dedico a combinar diseño y funcionalidad para crear experiencias digitales impactantes y accesibles.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <button
                            onClick={() => onNavigate('projects')} 
                            className="bg-transparent border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base"
                        >
                            Ver proyectos
                        </button>
                        <button
                            onClick={() => onNavigate('contact')}  
                            className="bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base"
                        >
                            Contacta conmigo
                        </button>
                    </div>
                </div>

                {/* Contenido Imagen */}
                <div className="flex justify-center md:justify-end items-center">
                    <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                        <div className="absolute inset-0 bg-blue-500 dark:bg-blue-400 rounded-full blur-2xl opacity-50 animate-pulse transform scale-110" />
                        <img 
                            src={Foto} 
                            alt="Foto de perfil" 
                            className="relative z-10 w-full h-full object-cover rounded-full shadow-lg"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;