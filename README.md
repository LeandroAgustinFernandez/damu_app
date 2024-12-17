Instalacion Librerias:
- npm install

Ejecucion:
- Descargar App Expo Go.
- npm start
- Para ejecutar en el navegador presionar "w"
- Para ejecutar en dispositivo mobil escanear QR.

Tecnologías:
- Entorno: Expo Go
- Lenguaje: React Native (JavaScript)
- Base de datos: NeonDatabase
- Autenticacion: Clerk
- Almacenamiento: Cloudinary (A definir) 

Estructura del proyecto:
```paintext
DAMU/
├── assets/                   # Archivos estáticos (imágenes, fuentes, etc.)
├── components/               # Componentes reutilizables
│   ├── Doctors/              # Componente para la seccion de doctores
│   │   ├── DoctorItem.js     # Componente doctor item
│   ├── Medications/          # Componente para la seccion de Medicamentos
│   │   ├── MedicationItem.js # Componente medicacion item
│   ├── Studies/              # Componente para la seccion de estudios
│   │   ├── StudyItem.js      # Componente estudio item
│   ├── DownloadLink.js       # Componente para descarga de archivo
│   ├── Filter.js             # Componente de filtro
│   ├── Header.js             # Componente para el header de las secciones
│   ├── HomeCard.js           # Componente Card de las secciones de la Home
│   ├── index.js              # Archivo configuración exports
│   ├── ModalAlert.js         # Componente Modal para alertar en caso de suceso o error
│   ├── ModalDelete.js        # Componente Modal para borrar items
│   ├── ModalShow.js          # Componente Modal para mostrar items
├── constants/                # Configuración de constantes
│   ├── days.js               # Días
│   ├── menu.js               # Módulos
├── context/                  # Contexto de la aplicación
│   ├── UserContext.js        # Contexto del usuario
├── navigation/               # Configuración de navegación
│   ├── AppNavigator.js       # Navegación de las secciones
│   ├── AuthNavigator.js      # Navegación de autenticación
│   ├── MainNavigator.js      # Navegación principal
├── screens/                  # Pantallas principales de la app
│   ├── Auth/                 # Pantallas relacionadas con autenticación
│   │   ├── SignInScreen.js   # Pantalla de login de usuario
│   │   ├── SignUpScreen.js   # Pantalla de registro de usuario
│   │   ├── VerificationScreen.js   # Pantalla de verificación de usuario
│   ├── Doctors/              # Funcionalidades relacionadas con médicos
│   │   ├── DoctorsScreen.js  # Lista de médicos
│   │   ├── DoctorsForm.js    # Formulario para crear/editar médicos
│   ├── Studios/             # Funcionalidades relacionadas con estudios
│   │   ├── StudiesScreen.js  # Lista de estudios
│   │   ├── StudiesForm.js    # Formulario para crear/editar estudios
│   ├── Medications/         # Funcionalidades relacionadas con medicamentos
│   │   ├── MedicationsScreen.js    # Lista de medicamentos
│   │   ├── MedicationsForm.js      # Formulario para crear/editar medicamentos
│   ├── Alarms/              # Funcionalidades de alarmas
│   │   ├── AlarmsScreen.js   # Lista de alarmas
│   │   ├── AlarmsForm.js     # Formulario para crear/editar alarmas
├── services/                 # Servicios para conexión externa
│   ├── api/                  # Configuración y consultas a NeonDatabase
│   │   ├── connection.js     # Conexion a la base de datos
│   │   ├── doctors.js        # Consultas a la base de datos - doctors
│   │   ├── studies.js        # Consultas a la base de datos - studies
│   │   ├── medications.js    # Consultas a la base de datos - medications
│   │   ├── specialities.js   # Consultas a la base de datos - specialities
│   │   ├── studies.js        # Consultas a la base de datos - studies
│   │   ├── users.js          # Consultas a la base de datos - user
│   │   ├── alarms.js         # Consultas a la base de datos - alarms
│   ├── cloudinary/           # Configuración servicio Cloudinary (subir archivos)
│   │   ├── cloudinary.js     # servicio Cloudinary
│   │   index.js              # Archivo configuración exports
│   ├── notificationService.js      # Configuración de notificaciones
├── styles/                   # Estilos compartidos
│   ├── colors.js             # Paleta de colores
│   ├── globalStyles.js       # Estilos globales
├── App.js                    # Entrada principal de la app
└── package.json              # Configuración del proyecto
└── .env                      # Variables de entorno
```