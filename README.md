# Alerta Búsqueda

## Integrante

* Gonzalo Miranda

## Descripción del proyecto

Alerta Búsqueda es una aplicación web (Single Page Application) orientada a la consulta y difusión de información sobre personas desaparecidas. El objetivo del sitio es permitir que los usuarios puedan consultar casos de búsqueda de forma dinámica, registrar una solicitud de búsqueda y suscribirse a un sistema de alertas zonal.

El proyecto fue migrado de su estructura original en HTML/CSS a una arquitectura moderna basada en **React**, optimizando la velocidad de navegación, la experiencia de usuario (sin recargas de página) y la modularidad del código. Fue desarrollado con fines académicos para la materia Programación IV.

## Tecnologías utilizadas

Para esta nueva versión del proyecto se implementaron las siguientes tecnologías y herramientas:

* **React (con Vite):** Librería principal para la construcción de interfaces de usuario mediante componentes reutilizables y un entorno de desarrollo ultrarrápido.
* **React Router DOM:** Para la gestión de rutas y navegación dinámica tipo SPA (Single Page Application), permitiendo cambiar de vistas sin recargar el navegador.
* **React Bootstrap 5:** Framework de diseño adaptado a componentes de React (como `Container`, `Row`, `Col`, `Card`, `Form` y `Offcanvas`) para garantizar un diseño responsivo y moderno.
* **React Helmet Async:** Herramienta clave para la inyección dinámica de metadatos y optimización SEO en cada ruta.
* **Bootstrap Icons:** Sistema de iconografía del proyecto.
* **Git y GitHub:** Control de versiones siguiendo un flujo de trabajo profesional con ramas diferenciadas (`main` para producción, `dev` para integración, y `feature/*` para nuevas funcionalidades).
* **Vercel / Netlify:** Plataforma para el despliegue (deploy) del proyecto.

## Estrategias SEO Implementadas

Dado que las aplicaciones React clásicas (SPA) presentan desafíos para la indexación en motores de búsqueda, se aplicaron estrategias específicas para garantizar un buen posicionamiento y accesibilidad:

1. **Metadatos Dinámicos (React Helmet Async):** Se configuró un `<HelmetProvider>` global para modificar dinámicamente las etiquetas `<title>` y `<meta name="description">` dependiendo de la vista en la que se encuentre el usuario (Inicio, Búsqueda, Registro o Alertas).
2. **Semántica HTML:** Uso correcto de etiquetas estructurales (`<main>`, `<h1>`, `<h2>`) dentro de los componentes para establecer jerarquías claras de información.
3. **Accesibilidad (Atributos ALT):** Todas las imágenes del sitio cuentan con descripciones descriptivas en sus atributos `alt` para facilitar la lectura por parte de screen-readers y rastreadores web.
4. **Mobile-First y Performance:** La carga instantánea provista por Vite y el diseño 100% responsivo con React Bootstrap son factores clave que los motores de búsqueda (como Google) priorizan para el posicionamiento actual.

## Diseño Responsivo (Responsive Design)

La adaptabilidad a distintos dispositivos (celulares, tablets y pantallas de escritorio) está manejada íntegramente por el sistema de grillas y componentes de **React Bootstrap**.

* **Navegación:** Se implementó un menú lateral (`Offcanvas`) que se despliega de forma suave y se adapta al tamaño de la pantalla, ocultándose automáticamente tras seleccionar una ruta.
* **Estructura de grillas:** Se reemplazaron las antiguas configuraciones manuales de CSS Grid y Flexbox por las clases utilitarias de Bootstrap (`Col md={8} lg={6}`, `d-flex`, `justify-content-center`), permitiendo que formularios y tarjetas de búsqueda se reacomoden automáticamente según el dispositivo.

## Objetivos del Sistema

* Agilizar la consulta y visualización de casos de personas desaparecidas mediante una interfaz rápida y sin interrupciones.
* Facilitar un formulario validado y estructurado para el registro de nuevas solicitudes de búsqueda (sujetas a moderación).
* Permitir al usuario suscribirse de manera localizada a alertas de su provincia o ciudad.
* Garantizar un código escalable, modular y preparado para conectarse a un backend en el futuro.
