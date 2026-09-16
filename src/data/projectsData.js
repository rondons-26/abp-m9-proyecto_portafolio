import Proyecto1 from '../img/1proyecto.jpg';
import Proyecto2 from '../img/2proyecto.png';
import Proyecto3 from '../img/3proyecto.png';

export const projects = [
  {
    id: 'taskflow',
    title: "TaskFlow - Single Page Application",
    description: "Gestor de tareas dinámico en tiempo real modularizado con JavaScript ES6 nativo y persistencia LocalStorage.",
    tech: ["JavaScript ES6", "HTML5", "Tailwind CSS", "LocalStorage"],
    role: "Desarrollo Frontend completo y arquitectura modular de componentes.",
    image: Proyecto1,
    github: "https://github.com/esau221",
    demo: "#"
  },
  {
    id: 'smart-wallet',
    title: "Smart Wallet - Finanzas Personales",
    description: "Aplicación de seguimiento financiero con gestión de tarjetas, autenticación de usuarios y registro de transacciones.",
    tech: ["React", "Vite", "Tailwind CSS", "Firebase Auth"],
    role: "Desarrollo Frontend, integración con Firebase y diseño de interfaz UX/UI.",
    image: Proyecto2,
    github: "https://github.com/esau221",
    demo: "#"
  },
  {
    id: 'backend-api',
    title: "API REST Full Stack & Seguridad JWT",
    description: "Servidor backend robusto con arquitectura MVC, base de datos relacional PostgreSQL, Sequelize ORM y subida de archivos.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Sequelize", "JWT"],
    role: "Desarrollo Backend, modelado relacional y seguridad de endpoints.",
    image: Proyecto3,
    github: "https://github.com/esau221",
    demo: "#"
  }
];