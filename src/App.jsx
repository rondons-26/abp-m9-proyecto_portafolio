import React from 'react';
import Header from './components/Header';
import { HomeIcon, UserIcon, BriefcaseIcon, CodeIcon, MailIcon, FileTextIcon } from './components/Icons';

import HeroSection from './sections/HeroSection';
import TrajectorySection from './sections/TrajectorySection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import CaseStudySection from './sections/CaseStudySection';

export default function App() {
  const [activeSection, setActiveSection] = React.useState('home');
  const [displaySection, setDisplaySection] = React.useState('home');
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    if (activeSection !== displaySection) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplaySection(activeSection);
        setIsFading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeSection, displaySection]);

  const sections = {
    'home': <HeroSection onNavigate={setActiveSection} />,
    'casestudy': <CaseStudySection />,
    'projects': <ProjectsSection />,
    'skills': <SkillsSection />,
    'trajectory': <TrajectorySection />,
    'contact': <ContactSection />
  };

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Inicio' },
    { id: 'casestudy', icon: FileTextIcon, label: 'Caso Estudio' },
    { id: 'projects', icon: BriefcaseIcon, label: 'Proyectos' },
    { id: 'skills', icon: CodeIcon, label: 'Skills' },
    { id: 'trajectory', icon: UserIcon, label: 'Trayectoria' },
    { id: 'contact', icon: MailIcon, label: 'Contacto' }
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans relative transition-colors duration-300">
      <Header />
      
      <main className="relative z-10">
        <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {sections[displaySection]}
        </div>
      </main>

      {/* Navbar Inferior Flotante - Ajustado para simetría exacta en móvil y desktop */}
      <footer className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-around w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 rounded-full p-2 shadow-xl transition-all duration-300">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`p-2.5 sm:p-3 rounded-full transition-colors duration-300 ${
                activeSection === item.id 
                  ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white'
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}