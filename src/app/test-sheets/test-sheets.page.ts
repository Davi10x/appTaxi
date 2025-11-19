import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleSheetsService, Usuario } from '../services/google-sheets.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonText,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-test-sheets',
  templateUrl: './test-sheets.page.html',
  styleUrls: ['./test-sheets.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonSpinner,
    IonText,
    IonButtons,
    IonBackButton,
  ]
})
export class TestSheetsPage implements OnInit {
  usuarios: Usuario[] = [];
  loading = false;
  error = '';
  success = '';

  constructor(private googleSheets: GoogleSheetsService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
    
    this.googleSheets.getUsers().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.usuarios = response.data || [];
          this.success = `${this.usuarios.length} usuarios cargados`;
        } else {
          this.error = response.message;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error de conexión: ' + err.message;
        console.error('Error:', err);
      }
    });
  }

  testCreate() {
    this.loading = true;
    this.error = '';
    
    const testUser = {
      nombres: 'Prueba',
      apellidos: 'Test',
      cedula: '1710034065',
      telefono: '0987654321',
      email: 'test@gmail.com',
      direccion: 'Av. Test 123'
    };

    this.googleSheets.registerUser(testUser).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.success = 'Usuario de prueba creado exitosamente';
          this.loadUsers(); // Recargar la lista
        } else {
          this.error = response.message;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al crear: ' + err.message;
        console.error('Error:', err);
      }
    });
  }
}