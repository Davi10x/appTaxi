# 📊 Integración con Google Sheets - TaxisYa

## 🎯 Configuración Paso a Paso

### PASO 1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja
3. **IMPORTANTE**: Asegúrate de que la primera pestaña se llame **"Hoja 1"** (o renómbrala)
4. En la primera fila (fila 1), agrega estos encabezados **EXACTAMENTE** como están:
   - **A1**: ID
   - **B1**: Nombres
   - **C1**: Apellidos
   - **D1**: Cedula
   - **E1**: Telefono
   - **F1**: Email
   - **G1**: Direccion
   - **H1**: Fecha_Registro

**Ejemplo:**
```
| ID | Nombres | Apellidos | Cedula     | Telefono   | Email           | Direccion        | Fecha_Registro      |
|----|---------|-----------|------------|------------|-----------------|------------------|---------------------|
|    |         |           |            |            |                 |                  |                     |
```

### PASO 2: Crear el Apps Script

1. En tu Google Sheet, ve a **Extensiones > Apps Script**
2. Borra todo el código que aparece por defecto
3. Copia el código que está en `google-apps-script/Code.gs`
4. Pégalo en el editor de Apps Script
5. Guarda el proyecto (Ctrl+S o File > Save)
   - Nómbralo: "TaxisYa API"

### PASO 3: Desplegar el Script como Web App

1. En Apps Script, haz clic en **"Implementar"** (botón azul arriba a la derecha)
2. Selecciona **"Nueva implementación"**
3. Tipo: Click en el ícono de engranaje ⚙️ y selecciona **"Aplicación web"**
4. Configuración:
   - **Descripción**: API TaxisYa v1
   - **Ejecutar como**: Yo (tu email)
   - **Quién tiene acceso**: **Cualquier persona** ⚠️ IMPORTANTE
5. Haz clic en **"Implementar"**
6. Es posible que te pida autorizar el acceso:
   - Click en "Autorizar acceso"
   - Selecciona tu cuenta de Google
   - Click en "Avanzado"
   - Click en "Ir a [nombre del proyecto] (no seguro)"
   - Click en "Permitir"
7. **COPIA LA URL** que te aparece (algo como: `https://script.google.com/macros/s/AKfycby...xyz/exec`)

### PASO 4: Configurar la URL en tu App

1. Abre el archivo `src/app/services/google-sheets.service.ts`
2. Encuentra esta línea (línea 20 aproximadamente):
   ```typescript
   private readonly SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';
   ```
3. **Reemplaza** `'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec'` con la URL que copiaste en el paso anterior
4. Guarda el archivo

### PASO 5: Probar la Integración

1. Asegúrate de que el servidor esté corriendo:
   ```bash
   ionic serve
   ```
2. Ve a la página de "Crear Cuenta" en tu app
3. Llena el formulario con datos válidos:
   - **Cédula válida de prueba**: `1710034065`
   - **Teléfono**: `0987654321`
   - **Email**: `prueba@gmail.com`
4. Haz clic en "Crear Cuenta"
5. Verifica en tu Google Sheet que el usuario se haya guardado

## ✅ Funcionalidades Implementadas

### En Google Sheets:
- ✓ **Guardar usuarios** automáticamente (POST)
- ✓ **Leer usuarios** existentes (GET)
- ✓ Generar ID único incremental
- ✓ Verificar que la cédula no esté duplicada
- ✓ Verificar que el email no esté duplicado
- ✓ Registrar fecha y hora de creación
- ✓ Manejo de errores
- ✓ Respuestas en formato JSON

### En la App:
- ✓ Validación de cédula ecuatoriana real (algoritmo módulo 10)
- ✓ Validación de teléfono ecuatoriano
- ✓ Validación de email con @
- ✓ Loading spinner durante el guardado
- ✓ Mensajes de éxito/error
- ✓ Solo permite números en cédula y teléfono
- ✓ Validación en tiempo real con colores
- ✓ Leer lista completa de usuarios
- ✓ Buscar usuario por cédula
- ✓ Verificar si usuario existe antes de registrar

## 📱 Estructura de Datos

Cada usuario guardado en Google Sheets tendrá:

```javascript
{
  id: 1,                              // Auto-generado
  nombres: "Juan",
  apellidos: "Pérez",
  cedula: "1710034065",              // 10 dígitos
  telefono: "0987654321",            // 10 dígitos
  email: "juan@example.com",
  direccion: "Av. Principal 123",
  fecha_registro: "2025-11-13 14:30:00"
}
```

## 🔧 Troubleshooting

### Error: "No se pudo conectar con el servidor"
- Verifica que hayas copiado correctamente la URL del Apps Script
- Asegúrate de que el Apps Script esté desplegado con acceso "Cualquier persona"
- Verifica tu conexión a internet

### Error: "Esta cédula ya está registrada"
- La cédula ya existe en la base de datos
- Usa una cédula diferente o elimina el registro duplicado en Google Sheets

### Error: "Este correo ya está registrado"
- El email ya existe en la base de datos
- Usa un email diferente

### Los datos no se guardan:
1. Verifica que la URL del script sea correcta
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que el Apps Script tenga permisos correctos
4. Asegúrate de que los encabezados en la hoja coincidan exactamente

## 🔒 Seguridad

**IMPORTANTE**: Esta es una implementación básica para desarrollo/testing. Para producción considera:

1. Agregar autenticación API Key
2. Implementar rate limiting
3. Encriptar datos sensibles
4. Usar HTTPS siempre
5. Validar datos en el servidor también

## 📊 Ver los Datos

Para ver todos los usuarios registrados:
1. Abre tu Google Sheet
2. Verás una nueva fila por cada usuario registrado
3. Puedes exportar a Excel, hacer gráficos, etc.

## 🎓 Ejemplo de Cédulas Ecuatorianas Válidas

Para testing, usa estas cédulas válidas:
- `1710034065`
- `0926687856`
- `1234567890` (puede no ser válida, depende del algoritmo)

## 📞 Soporte

Si tienes problemas:
1. Verifica todos los pasos
2. Revisa la consola del navegador (F12)
3. Verifica los logs en Apps Script (View > Logs)
