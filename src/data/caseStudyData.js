export const caseStudyData = {
  title: "Arquitectura REST API & Persistencia Relacional",
  subtitle: "Sistema backend centralizado con arquitectura MVC, autenticación JWT y PostgreSQL.",
  challenge: "Diseñar e implementar un servidor seguro y escalable capaz de manejar autenticación persistente, sesiones concurrentes con JWT, control de acceso basado en roles (RBAC) y operaciones CRUD transaccionales sobre una base de datos relacional PostgreSQL sin comprometer el tiempo de respuesta.",
  solution: "Construcción de una REST API en Node.js y Express estructurada bajo el patrón MVC. Se implementó Sequelize ORM para el modelado relacional, middlewares de validación de datos, hashing con bcrypt, protección de rutas con JWT y gestión segura de subida de archivos mediante Multer.",
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
  justification: "Este proyecto demuestra mi capacidad para resolver problemas complejos del lado del servidor, asegurando la integridad de la base de datos, la seguridad de las credenciales y el cumplimiento de estándares de arquitectura limpia que demanda la industria IT profesional."
};