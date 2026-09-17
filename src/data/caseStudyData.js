export const caseStudyData = {
    title: "Arquitectura REST API & Persistencia Relacional",
    subtitle: "Sistema backend centralizado con arquitectura MVC, autenticación JWT y PostgreSQL.",
    challenge: "Diseñar e implementar un servidor seguro y escalable capaz de manejar autenticación persistente, sesiones concurrentes con JWT, control de acceso basado en roles (RBAC) y operaciones CRUD transaccionales sobre una base de datos relacional PostgreSQL sin comprometer el tiempo de respuesta.",
    solution: "Construcción de una REST API en Node.js y Express estructurada bajo el patrón MVC. Se implementó Sequelize ORM para el modelado relacional, middlewares de validación de datos, hashing de claves con bcrypt, protección de rutas con JWT y gestión segura de subida de archivos mediante Multer.",
    metrics: [
        { value: "100%", label: "Rutas Protegidas" },
        { value: "< 120ms", label: "Tiempo de Respuesta" },
        { value: "MVC", label: "Arquitectura Modular" },
        { value: "0%", label: "Inyección SQL (ORM)" }
    ],
    technologies: [
        'Node.js', 
        'Express.js', 
        'PostgreSQL', 
        'Sequelize ORM', 
        'JWT', 
        'Bcrypt', 
        'Multer', 
        'Git / GitHub'
    ],
    justification: "Fue seleccionado como caso de estudio por evidenciar mi dominio backend integral: diseño de arquitecturas servidor seguras, integridad transaccional en PostgreSQL y gestión de sesiones JWT bajo código limpio."
};