# DavidStand - Aplicación de Taxi

## 📱 Descripción
DavidStand es una aplicación móvil desarrollada con Ionic 8 y Angular 20 para la gestión de servicios de taxi en Ecuador. La aplicación permite a los usuarios registrarse, solicitar taxis, consultar su actividad y gestionar su perfil.

## ✨ Características Principales

### Para Usuarios
- **Registro de Usuario**: Formulario completo con validación de datos ecuatorianos
  - Validación de cédula ecuatoriana (algoritmo módulo 10)
  - Validación de teléfono (formato de 10 dígitos)
  - Validación de correo electrónico
- **Inicio de Sesión**: Sistema de autenticación seguro
- **Solicitud de Taxi**: Interfaz con mapa interactivo (OpenStreetMap)
- **Historial de Actividad**: Consulta de viajes realizados
- **Gestión de Perfil**: Edición de datos personales
- **Soporte**: Sistema de ayuda y contacto
- **Notificaciones**: Alertas y actualizaciones en tiempo real

### Características Técnicas
- Arquitectura de componentes standalone (Angular 20)
- Integración con Google Sheets como base de datos
- Backend con Google Apps Script
- Interfaz responsiva y moderna
- Validaciones en tiempo real
- Mapas interactivos con Leaflet

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Ionic 8**: Framework para aplicaciones móviles híbridas
- **Angular 20**: Framework de desarrollo web
- **TypeScript**: Lenguaje de programación
- **SCSS**: Preprocesador CSS para estilos
- **Leaflet 1.9.4**: Biblioteca de mapas interactivos
- **Capacitor**: Para funcionalidades nativas

### Backend
- **Google Apps Script**: Servicio serverless de Google
- **Google Sheets**: Base de datos en la nube

### Herramientas de Desarrollo
- **Node.js**: Entorno de ejecución
- **Angular CLI**: Herramientas de línea de comandos
- **Karma**: Testing framework
- **Jasmine**: Framework de pruebas

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Ionic CLI: `npm install -g @ionic/cli`
- Android Studio (para desarrollo Android)
- Una cuenta de Google (para Google Sheets)

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd davidStand
```

### 2. Instalar Dependencias
```powershell
npm install
```

### 3. Configurar Google Sheets
Ver archivo `GOOGLE_SHEETS_SETUP.md` para instrucciones detalladas.

Pasos rápidos:
1. Crear una hoja de cálculo en Google Sheets
2. Copiar el código de `google-apps-script/Code.gs`
3. Desplegar como Web App
4. Configurar la URL en `src/app/services/google-sheets.service.ts`

### 4. Ejecutar en Desarrollo
```powershell
ionic serve
```

La aplicación estará disponible en `http://localhost:8100`

### 5. Compilar para Android
```powershell
ionic build
ionic cap add android
ionic cap sync
ionic cap open android
```

## 📁 Estructura del Proyecto

```
davidStand/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── services/            # Servicios de Angular
│   │   ├── login/               # Página de inicio de sesión
│   │   ├── crear/               # Página de registro
│   │   ├── folder/              # Página principal/dashboard
│   │   ├── solicitar/           # Página de solicitud de taxi
│   │   ├── tuactividad/         # Historial de viajes
│   │   ├── editar-perfil/       # Edición de perfil
│   │   ├── configuracion/       # Configuración de la app
│   │   ├── soporte/             # Página de soporte
│   │   ├── forgot-password/     # Recuperación de contraseña
│   │   ├── test-sheets/         # Pruebas de Google Sheets
│   │   ├── app.component.ts     # Componente raíz
│   │   └── app.routes.ts        # Configuración de rutas
│   ├── assets/                  # Recursos estáticos
│   ├── environments/            # Configuraciones de entorno
│   └── theme/                   # Estilos globales
├── android/                     # Proyecto Android nativo
├── google-apps-script/          # Backend de Apps Script
├── GOOGLE_SHEETS_SETUP.md      # Guía de configuración
├── angular.json                 # Configuración de Angular
├── capacitor.config.ts          # Configuración de Capacitor
├── ionic.config.json            # Configuración de Ionic
├── package.json                 # Dependencias del proyecto
└── tsconfig.json               # Configuración de TypeScript
```

## 🔧 Configuración

### Variables de Entorno
Editar `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  googleSheetsUrl: 'TU_URL_DE_APPS_SCRIPT'
};
```

### Capacitor
Configuración en `capacitor.config.ts`:
- `appId`: Identificador de la aplicación
- `appName`: Nombre de la aplicación
- `webDir`: Directorio de salida (www)

## 📱 Páginas de la Aplicación

### Login (`/login`)
- Autenticación de usuarios
- Recuperación de contraseña
- Enlace a registro

### Crear Cuenta (`/crear`)
- Formulario de registro completo
- Validaciones ecuatorianas
- Integración con Google Sheets

### Dashboard (`/folder`)
- Página principal
- Acceso rápido a funciones
- Notificaciones

### Solicitar Taxi (`/solicitar`)
- Mapa interactivo
- Selección de ubicación
- Solicitud de servicio

### Tu Actividad (`/tuactividad`)
- Historial de viajes
- Detalles de servicios
- Estadísticas

### Editar Perfil (`/editar-perfil`)
- Actualización de datos
- Cambio de foto
- Preferencias

### Configuración (`/configuracion`)
- Ajustes de la aplicación
- Preferencias de usuario
- Gestión de cuenta

### Soporte (`/soporte`)
- Centro de ayuda
- Contacto
- Preguntas frecuentes

## 🔐 Validaciones Implementadas

### Cédula Ecuatoriana
- Algoritmo módulo 10
- Verificación de dígitos
- Solo números permitidos

### Teléfono
- Formato: 10 dígitos
- Debe comenzar con 0
- Solo números

### Email
- Debe contener @
- Formato válido de correo

## 🧪 Testing

### Ejecutar Pruebas Unitarias
```powershell
npm test
```

### Página de Pruebas
Acceder a `/test-sheets` para probar la integración con Google Sheets:
- Cargar usuarios existentes
- Crear usuario de prueba
- Verificar conexión

## 📦 Compilación para Producción

### Web
```powershell
ionic build --prod
```

### Android
```powershell
ionic build --prod
ionic cap sync
ionic cap open android
# En Android Studio: Build > Generate Signed Bundle/APK
```

## 🐛 Solución de Problemas Comunes

### Error de CORS con Google Sheets
- Verificar que el Apps Script esté desplegado como "Anyone"
- Comprobar la URL en google-sheets.service.ts

### Mapa no se muestra
- Verificar instalación de Leaflet
- Comprobar permisos de ubicación

### Error de compilación Android
- Actualizar Gradle
- Sincronizar con `ionic cap sync`

## 📞 Soporte y Contacto

Para reportar problemas o sugerencias:
- Email: soporte@davidstand.com
- Issues: <url-del-repositorio>/issues

## 📄 Licencia

Este proyecto es propiedad privada. Todos los derechos reservados.

## 👥 Equipo de Desarrollo

Desarrollado por el equipo de DavidStand

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025
