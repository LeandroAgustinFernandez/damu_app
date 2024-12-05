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

DAMU/
├── assets/                   # Archivos estáticos (imágenes, fuentes, etc.)
├── components/               # Componentes reutilizables
│   ├── Button.js             # Componente de botón reutilizable
│   ├── InputField.js         # Componente para campos de entrada
│   ├── Modal.js              # Modal genérico
├── navigation/               # Configuración de navegación
│   ├── AppNavigator.js       # Navegación principal
│   ├── AuthNavigator.js      # Navegación de autenticación
├── screens/                  # Pantallas principales de la app
│   ├── Auth/                 # Pantallas relacionadas con autenticación
│   │   ├── LoginScreen.js    # Pantalla de login
│   ├── Medicos/              # Funcionalidades relacionadas con médicos
│   │   ├── MedicoList.js     # Lista de médicos
│   │   ├── MedicoForm.js     # Formulario para crear/editar médicos
│   ├── Estudios/             # Funcionalidades relacionadas con estudios
│   │   ├── EstudioList.js    # Lista de estudios
│   │   ├── EstudioForm.js    # Formulario para crear/editar estudios
│   ├── Medicamentos/         # Funcionalidades relacionadas con medicamentos
│   │   ├── MedicamentoList.js# Lista de medicamentos
│   │   ├── MedicamentoForm.js# Formulario para crear/editar medicamentos
│   ├── Alarmas/              # Funcionalidades de alarmas
│   │   ├── AlarmaList.js     # Lista de alarmas
│   │   ├── AlarmaForm.js     # Formulario para crear/editar alarmas
├── services/                 # Servicios para conexión externa
│   ├── api/                # Configuración y consultas a NeonDatabase
│   │   ├── connection.js     # Conexion a la base de datos
│   │   ├── doctors.js        # Consultas a la base de datos - doctors
│   │   ├── studies.js        # Consultas a la base de datos - studies
│   │   ├── medications.js    # Consultas a la base de datos - medications
│   │   ├── specialities.js   # Consultas a la base de datos - specialities
│   │   ├── studies.js        # Consultas a la base de datos - studies
│   │   ├── users.js          # Consultas a la base de datos - user
│   │   ├── alarms.js         # Consultas a la base de datos - alarms
│   │   ├── index.js          # Archivo configuración exports
│   ├── firebaseConfig.js     # Configuración de Firebase
│   ├── notificationService.js# Configuración de notificaciones
├── styles/                   # Estilos compartidos
│   ├── colors.js             # Paleta de colores
│   ├── globalStyles.js       # Estilos globales
├── App.js                    # Entrada principal de la app
└── package.json              # Configuración del proyecto