# Empieza por Educar - Admin Dashboard
![utils\assets\readme\logo-exe-300-01.png](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/logo-exe-300-01.png)
## Descripción del Proyecto
Empieza por Educar es una organización sin ánimo de lucro que trabaja para contribuir en la igualdad de oportunidades en educación. La misión de nuestro cliente es crear una red de profesionales que trabajan por la equidad educativa desde dentro y fuera del aula. A través de su programa Programa ExE, enfocado al desarrollo profesional y dirigido a aquellas personas que aspiran a generar un cambio educativo y social en beneficio de la igualdad de oportunidades de todos los niños y niñas, han conseguido formar a más de 300 profesores/as en estos últimos años.

Este proyecto está destinado a ayudar en el proceso de selección de candidat@s del Programa ExE. El objetivo es desarrollar un Admin Dashboard como una aplicación web para proporcionar una plataforma centralizada para la gestión de datos relacionados con candidatos y empleados, facilitando la gestión y el análisis de información crucial para la empresa.
## Características de la Interfaz
![utils\assets\readme\landing-exe.png](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/landing-exe.png)
### Interfaz Intuitiva
Interfaz de usuario amigable y fácil de usar, diseñada para que usuarios de todos los niveles de experiencia puedan navegar y utilizar las funciones de manera eficiente.
### Mobile first + optimización en desktop
Filosofía de diseño mobile first y responsive, pero con una buena optimización en las vistas de escritorio para facilitar el uso de la aplicación en el día a día de la empresa.
### Personalización
Posibilidad de personalizar y adaptar la aplicación según las necesidades específicas de cada usuario o institución, permitiendo la configuración de campos personalizados, preferencias de visualización y más. Vista administrador vs. vista empleados.
### Seguridad
Medidas de seguridad robustas para proteger la integridad y confidencialidad de los datos almacenados en la aplicación, incluyendo autenticación de usuarios, cifrado de datos, pro y auditorías de acceso.
### Escalabilidad
La aplicación está diseñada para ser escalable y capaz de manejar grandes volúmenes de datos, lo que la hace adecuada para su uso tanto en instituciones educativas como en organizaciones de diferentes tamaños.
## Funcionalidades Principales
### Autenticación y accesos en función del rol del usuario
Secciones y recursos diferentes en función del rol del usuario logueado.<br>
Vista inicial admin:<br>
![utils\assets\readme\ogin-admin.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/login-admin.gif)

Vista inicial reclutador:<br>
![utils\assets\readme\ogin-reclutador.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/login-reclutador.gif)

### Gestión de candidatos
Permitir el registro y la gestión de información detallada de los postulantes, incluyendo datos personales, CV (en pdf) y detalles de contacto.<br>
Buscador:.<br>
![utils\assets\readme\buscador-candidato.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/buscador-candidato.gif)

### Gestión de empleados
Permitir el registro y la gestión de información detallada de los empleados, así como el reentrenamiento del modelo predictivo de machine learning diseñado por el equipo de Data Science.<br>
![utils\assets\readme\buscador-empleado.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/buscador-empleado.gif)

### Seguimiento de candidaturas
Automatizar el proceso de generación y seguimiento de la evolución de las candidaturas en cada una de las fases del proceso de selección.<br/>

Buscador:<br>
![utils\assets\readme\buscador-candidatura.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/buscador-candidatura.gif)

Vista detalle de la candidatura:.<br>
![utils\assets\readme\vista-detalle.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/vista-detalle.gif)

### Análisis de datos
Proporcionar herramientas de análisis, predicción y visualización de datos para obtener insights útiles a partir de la información recopilada. <br>
Estadísticas admin (móvil): <br>
![utils\assets\readme\stats-admin-mobile.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/stats-admin-mobile.gif)

Estadísticas admin (escritorio): <br>
![utils\assets\readme\stats-admin-desktop.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/stats-admin-desktop.gif)

Estadísticas reclutador: <br>
![utils\assets\readme\stats-reclutador.gif](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/stats-reclutador.gif)

## Tecnologías Utilizadas
- Frontend: React.js, SASS
- Backend: Node.js, Express.js
- Base de Datos: MySQL, AWS, Firebase: Cloud Storage
- Autenticación y Seguridad: JWT, cifrado de datos
- Control de Versiones: GitHub
## Arquitectura de la Solución
![utils\assets\readme\arquitectura-aplicacion-exe.jpg](https://github.com/diegoblazquezr/DT_Empieza_por_Educar/blob/develop/utils/assets/readme/arquitectura-aplicacion-exe.jpg)
## Gestión del Proyecto
- Control de Versiones: se ha gestionado el control de versiones con GitHub desde el principio del proyecto.
- Documentación y Pruebas: se ha incluido la documentación y test del proyecto.
- Metodología ágil: sprint diarios y empleo de la herramienta Trello para el reparto y el control de tareas.
## Estructura del Proyecto
### Backend (Express)
- Controllers: Controladores para gestionar la lógica de negocios.
- Models: Modelos para la gestión de la base de datos.
- Routes: Definición de rutas para la API.
- Validators: Validadores para asegurar la integridad de los datos recibidos.
### Frontend (React)
- Components: componentes React para la interfaz de usuario.
- Context: contextos que se propagan por todo el front para controlar las secciones a las que accede cada tipo de usuario.
- Styles: estilos de la aplicación.


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

Autores:<br>
**Diego Blázquez, Full Stack Developer**
<a href="https://www.linkedin.com/in/diego-blázquez-rosado-b08192ba/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" width=30px, height=30px/></a> 
<br>**Miguel Pardal, Full Stack Developer**
<a href="https://www.linkedin.com/in/miguel-pardal-esparís-a9051a2b4/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" width=30px, height=30px/></a> 
<br>**Sergio Lillo, Full Stack Developer**
<a href="https://www.linkedin.com/in/lillosergio/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" width=30px, height=30px/></a> 
<br>**Antonio González, Full Stack Developer**
<a href="https://www.linkedin.com/in/antonio-gonzález-torres-35b74522a/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1200px-LinkedIn_icon.svg.png" width=30px, height=30px/></a> 
