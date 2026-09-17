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
        github: "https://github.com/rondons-26/abp-m4-proyecto",
        demo: "https://rondons-26.github.io/abp-m4-proyecto/"
    },
    {
        id: "wallet-digital",
        title: "Wallet Digital - Finanzas Personales",
        description: "Billetera digital e interfaz dinámica para la administración de activos financieros, depósitos y transferencias. Demo: user@wallet.com / 1234",
        tech: ["HTML5", "CSS3", "JavaScript (ES6)", "Bootstrap", "jQuery"],
        role: "Desarrollo Frontend, maquetación dinámica y lógica de cliente para transacciones.",
        image: Proyecto2,
        github: "https://github.com/rondons-26/abp-m2-proyecto",
        demo: "https://rondons-26.github.io/abp-m2-proyecto/"
    },
    {
        id: 'backend-api',
        title: "CoreApp Enterprise",
        description: "Servidor backend robusto con arquitectura MVC, base de datos relacional PostgreSQL, Sequelize ORM y subida de archivos. Demo Admin: testing@admin.com / 123456",
        tech: ["Node.js", "Express.js", "PostgreSQL", "Sequelize", "JWT"],
        role: "Desarrollo Backend, modelado relacional y seguridad de endpoints.",
        image: Proyecto3,
        github: "https://github.com/rondons-26/abp-m8-proyecto",
        demo: "https://abp-m8-proyecto.onrender.com/shop"
    }
];