// ============================================
// FUNCIÓN GET - LEER DATOS DE GOOGLE SHEETS
// ============================================
function doGet(e) {
  try {
    // Obtener la hoja activa del spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1');
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: No se encontró la hoja "Hoja 1"'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Obtener todos los datos de la hoja
    const dataRange = sheet.getDataRange();
    const data = dataRange.getValues();
    
    if (data.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: 'No hay usuarios registrados',
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Primera fila como headers
    const headers = data[0];
    
    // Convertir todas las filas (excepto la primera) en objetos
    const users = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const obj = {};
      headers.forEach((header, index) => {
        if (index < row.length) {
          obj[header] = row[index];
        }
      });
      users.push(obj);
    }

    // Devolver todos los usuarios como JSON
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Usuarios obtenidos correctamente',
      data: users,
      total: users.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// FUNCIÓN POST - GUARDAR DATOS EN GOOGLE SHEETS
// ============================================
function doPost(e) {
  try {
    // Obtener la hoja activa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1');
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: No se encontró la hoja "Hoja 1"'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parsear los datos recibidos
    const data = JSON.parse(e.postData.contents);
    
    // Validar que todos los campos estén presentes
    if (!data.nombres || !data.apellidos || !data.cedula || !data.telefono || !data.email) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Faltan campos requeridos'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Verificar si la cédula ya existe
    const dataRange = sheet.getDataRange().getValues();
    for (let i = 1; i < dataRange.length; i++) {
      if (dataRange[i][3] === data.cedula) { // Columna D (índice 3)
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            message: 'Esta cédula ya está registrada'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Verificar si el email ya existe
    for (let i = 1; i < dataRange.length; i++) {
      if (dataRange[i][5] === data.email) { // Columna F (índice 5)
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            message: 'Este correo ya está registrado'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Generar ID único
    const lastRow = sheet.getLastRow();
    const newId = lastRow > 1 ? parseInt(dataRange[lastRow - 1][0]) + 1 : 1;
    
    // Obtener fecha actual
    const fecha = new Date();
    const fechaFormateada = Utilities.formatDate(fecha, "GMT-5", "yyyy-MM-dd HH:mm:ss");
    
    // Agregar nueva fila con los datos
    sheet.appendRow([
      newId,
      data.nombres,
      data.apellidos,
      data.cedula,
      data.telefono,
      data.email,
      data.direccion || '',
      fechaFormateada
    ]);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          id: newId,
          nombres: data.nombres,
          apellidos: data.apellidos,
          fecha: fechaFormateada
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error en el servidor: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// FUNCIÓN AUXILIAR - OBTENER TODOS LOS USUARIOS
// ============================================
function getAllUsers() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hoja 1');
  if (!sheet) return [];
  
  const dataRange = sheet.getDataRange().getValues();
  
  // Ignorar la fila de encabezados
  const users = [];
  for (let i = 1; i < dataRange.length; i++) {
    users.push({
      id: dataRange[i][0],
      nombres: dataRange[i][1],
      apellidos: dataRange[i][2],
      cedula: dataRange[i][3],
      telefono: dataRange[i][4],
      email: dataRange[i][5],
      direccion: dataRange[i][6],
      fecha: dataRange[i][7]
    });
  }
  
  return users;
}

// ============================================
// FUNCIÓN DE PRUEBA - EJECUTAR MANUALMENTE
// ============================================
function testAPI() {
  Logger.log("=== PRUEBA DE API ===");
  const users = getAllUsers();
  Logger.log("Total de usuarios: " + users.length);
  Logger.log(users);
}