# Configuración de Google Maps API

## Paso 1: Obtener tu API Key de Google Maps

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Library**
4. Busca y habilita estas APIs:
   - **Maps JavaScript API**
   - **Geolocation API**
   - **Places API** (opcional, para autocompletar direcciones)
   - **Directions API** (para calcular rutas)
   - **Distance Matrix API** (para calcular distancias)

5. Ve a **APIs & Services** > **Credentials**
6. Haz clic en **Create Credentials** > **API Key**
7. Copia tu API Key (se verá así: `AIzaSyXxXxXxXxXxXxXxXxXxXxXxXxXxXxX`)

## Paso 2: Configurar la API Key en tu proyecto

Abre el archivo `src/index.html` y busca esta línea (ya está agregada):

```html
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&libraries=places,geometry"></script>
```

Reemplaza `TU_API_KEY_AQUI` con tu API Key real.

## Paso 3: Restricciones de seguridad (Recomendado)

En Google Cloud Console > Credentials > Tu API Key:

1. **Application restrictions**: 
   - Para desarrollo: None
   - Para producción: HTTP referrers (websites) y agrega tu dominio

2. **API restrictions**:
   - Restrict key
   - Selecciona solo las APIs que necesitas

## Paso 4: Configurar permisos en Android

Ya está configurado en `android/app/src/main/AndroidManifest.xml`

## Costos

Google Maps ofrece **$200 USD gratis** cada mes que cubren aproximadamente:
- 28,000 cargas de mapas
- 40,000 solicitudes de geolocalización
- 5,000 cálculos de rutas

Para una app pequeña/mediana, esto es suficiente sin costo.

## Verificar que funciona

1. Abre la app
2. Ve a "Solicitar Taxi"
3. Deberías ver el mapa de Google Maps
4. El botón de ubicación debería centrar el mapa en tu posición actual

## Solución de problemas

### El mapa no se carga
- Verifica que la API Key esté correcta en `src/index.html`
- Asegúrate de que Maps JavaScript API esté habilitada en Google Cloud Console

### Error "This page can't load Google Maps correctly"
- Tu API Key no es válida o no tiene permisos
- Revisa las restricciones de la API Key

### La geolocalización no funciona
- Asegúrate de dar permisos de ubicación a la app
- En navegador, usa HTTPS o localhost
