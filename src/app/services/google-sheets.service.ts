import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface UserData {
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface Usuario {
  ID: number;
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  Telefono: string;
  Email: string;
  Direccion: string;
  Fecha_Registro: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  total?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  // REEMPLAZA ESTA URL CON LA URL DE TU APPS SCRIPT
  private readonly SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los usuarios de Google Sheets
   */
  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.SCRIPT_URL).pipe(
      map(response => {
        console.log('Usuarios obtenidos:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        return from([{
          success: false,
          message: 'Error al obtener usuarios',
          data: []
        }]);
      })
    );
  }

  /**
   * Registrar un nuevo usuario en Google Sheets
   */
  registerUser(userData: UserData): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse>(
      this.SCRIPT_URL,
      JSON.stringify(userData),
      { headers }
    ).pipe(
      map(response => {
        console.log('Respuesta de Google Sheets:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al guardar en Google Sheets:', error);
        return from([{
          success: false,
          message: 'Error de conexión con el servidor'
        }]);
      })
    );
  }

  /**
   * Verificar si un usuario existe por cédula
   */
  checkUserByCedula(cedula: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(response => {
        if (response.success && response.data) {
          const users = response.data as Usuario[];
          return users.some(user => user.Cedula === cedula);
        }
        return false;
      })
    );
  }

  /**
   * Verificar si un usuario existe por email
   */
  checkUserByEmail(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(response => {
        if (response.success && response.data) {
          const users = response.data as Usuario[];
          return users.some(user => user.Email === email);
        }
        return false;
      })
    );
  }

  /**
   * Buscar usuario por cédula y retornar sus datos
   */
  getUserByCedula(cedula: string): Observable<Usuario | null> {
    return this.getUsers().pipe(
      map(response => {
        if (response.success && response.data) {
          const users = response.data as Usuario[];
          return users.find(user => user.Cedula === cedula) || null;
        }
        return null;
      })
    );
  }

  /**
   * Verificar si el servicio está disponible
   */
  checkStatus(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.SCRIPT_URL).pipe(
      map(response => {
        console.log('Estado del servicio:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error al verificar el servicio:', error);
        return from([{
          success: false,
          message: 'Servicio no disponible'
        }]);
      })
    );
  }
}