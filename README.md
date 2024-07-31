# Empieza por Educar - Admin Dashboard
![./client\src\assets\readme\logo-exe-300-01.png](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/client/src/assets/readme/logo-exe-300-01.png)
## Descripción del Proyecto
Empieza por Educar es una organización sin ánimo de lucro que trabaja para contribuir a la igualdad de oportunidades en educación. La misión de nuestro cliente es crear una red de profesionales que trabajan por la equidad educativa desde dentro y fuera del aula. A través de su programa Programa ExE, enfocado al desarrollo profesional y dirigido a aquellas personas que aspiran a generar un cambio educativo y social en beneficio de la igualdad de oportunidades de todos los niños y niñas.

Este proyecto está enfocado en la parte de PROGRAMA EXE, específicamente en la opción PROCESO DE SELECCIÓN. El objetivo es desarrollar un Admin Dashboard como una aplicación web diseñada para proporcionar una plataforma centralizada para la gestión de datos relacionados con candidatos, facilitando la administración y el análisis de información crucial para la empresa.
## Funcionalidades Principales
### Gestión de Candidatos al Programa
Permitir el registro y la gestión de información detallada de los postulantes, incluyendo datos personales y detalles de contacto.
### Seguimiento de Candidatos
Automatizar el proceso de generación y seguimiento de la evolución del candidato en cada una de las fases del proceso de selección.
### Análisis de Datos
Proporcionar herramientas de análisis y visualización de datos para obtener insights útiles a partir de la información recopilada. 
## Características de la Interfaz
![sc1](client\src\assets\readme\sc1.png)](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/client/src/assets/readme/sc1.png)
![sc2](client\src\assets\readme\sc2.png)](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/client/src/assets/readme/sc2.png)
![sc3](client\src\assets\readme\sc3.png)](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/client/src/assets/readme/sc3.png)
### Interfaz Intuitiva
Interfaz de usuario amigable y fácil de usar, diseñada para que usuarios de todos los niveles de experiencia puedan navegar y utilizar las funciones de manera eficiente.
### Personalización
Posibilidad de personalizar y adaptar la aplicación según las necesidades específicas de cada usuario o institución, permitiendo la configuración de campos personalizados, preferencias de visualización y más.
### Seguridad
Medidas de seguridad robustas para proteger la integridad y confidencialidad de los datos almacenados en la aplicación, incluyendo autenticación de usuarios, cifrado de datos y auditorías de acceso.
### Escalabilidad
La aplicación está diseñada para ser escalable y capaz de manejar grandes volúmenes de datos, lo que la hace adecuada para su uso tanto en instituciones educativas como en organizaciones de diferentes tamaños.
## Tecnologías Utilizadas
- Frontend: React.js, SASS
- Backend: Node.js, Express.js
- Base de Datos: MySQL, Firebase: Cloud Storage
- Autenticación y Seguridad: JWT, cifrado de datos
- Control de Versiones: GitHub
## Arquitectura de la Solución
1. Tecnologías: Decidir las tecnologías a usar trabajando de la mano con el equipo de Ciberseguridad para llegar a un consenso en cuanto al nivel de seguridad.
2. Desarrollo Frontend y Backend: Visualización de los datos de la app mediante un frontend desarrollado con React y un backend con Node.js y Express.
3. Mobile-first y SPA: La aplicación debe ser mobile-first y SPA (Single Page Application), asegurando que no haya recarga de página y solo se carguen y rendericen los contenidos mínimos necesarios con cada cambio de endpoint.
4. Escalabilidad y Gestión de Datos: Seleccionar la base de datos adecuada (SQL o NoSQL) para cada app en función del modelo de datos necesario, compatible con el trabajo del equipo de Data.

## Gestión del Proyecto
- Control de Versiones: Gestionar el control de versiones con GitHub desde el principio del proyecto.
- Documentación y Pruebas: Gestionar la documentación y pruebas del proyecto hasta el punto que el tiempo lo permita y de la mejor manera posible.
- Colaboración: Trabajar con los compañeros en la presentación, para exponer el trabajo de desarrollo.
## Estructura del Proyecto
### Backend (Express)
- Controllers: Controladores para gestionar la lógica de negocios.
- Models: Modelos para la gestión de la base de datos.
- Routes: Definición de rutas para la API.
- Validators: Validadores para asegurar la integridad de los datos recibidos.
### Frontend (React)
- Components: Componentes React para la interfaz de usuario.
- Pages: Páginas principales de la aplicación.
- Services: Servicios para interactuar con la API.
- Styles: Estilos de la aplicación.


## Instalación
Clonar el repositorio:

```
git clone https://github.com/tu_usuario/tu_repositorio.git

``` 

Instalar las dependencias del backend:

```
npm install
```

Instalar las dependencias del frontend:
```
cd client
npm install
```

Configurar las variables de entorno en ambos directorios.
Ejecutar la aplicación:
```
npm run server

cd client
npm run dev
```

## Contribuciones
Las contribuciones son bienvenidas. Para contribuir, por favor sigue los siguientes pasos:
1. Realiza un fork del proyecto.
2. Crea una rama para tu característica (git checkout -b feature/tu_caracteristica).
3. Realiza los commits necesarios (git commit -m 'Añadir mi característica').
4. Envía tus cambios (git push origin feature/tu_caracteristica).
5. Abre un Pull Request.
## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

Creado por los Alumnos de The Bridge.
