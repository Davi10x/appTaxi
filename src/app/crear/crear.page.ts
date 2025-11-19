import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { GoogleSheetsService } from '../services/google-sheets.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  idCardOutline, 
  callOutline, 
  mailOutline, 
  locationOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    IonText,
    IonIcon,
  ]
})
export class CrearPage {
  userData = {
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: ''
  };

  validations = {
    cedula: { valid: false, message: '' },
    telefono: { valid: false, message: '' },
    email: { valid: false, message: '' }
  };

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private googleSheets: GoogleSheetsService
  ) {
    addIcons({
      personOutline,
      idCardOutline,
      callOutline,
      mailOutline,
      locationOutline,
      checkmarkCircleOutline,
      closeCircleOutline
    });
  }

  // Validar cédula ecuatoriana (algoritmo del módulo 10)
  validarCedulaEcuatoriana(cedula: string): boolean {
    if (!cedula || cedula.length !== 10) {
      this.validations.cedula.message = 'La cédula debe tener 10 dígitos';
      return false;
    }

    // Verificar que solo contenga números
    if (!/^\d+$/.test(cedula)) {
      this.validations.cedula.message = 'La cédula solo debe contener números';
      return false;
    }

    // Verificar que los dos primeros dígitos correspondan a una provincia válida (01-24)
    const provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
      this.validations.cedula.message = 'Código de provincia inválido';
      return false;
    }

    // Algoritmo de validación
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitoVerificador = parseInt(cedula.charAt(9));
    let suma = 0;

    for (let i = 0; i < 9; i++) {
      let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
      if (valor >= 10) {
        valor -= 9;
      }
      suma += valor;
    }

    const resultado = suma % 10;
    const digitoEsperado = resultado === 0 ? 0 : 10 - resultado;

    if (digitoEsperado !== digitoVerificador) {
      this.validations.cedula.message = 'Cédula inválida';
      return false;
    }

    this.validations.cedula.message = 'Cédula válida';
    return true;
  }

  // Validar teléfono ecuatoriano
  validarTelefono(telefono: string): boolean {
    // Quitar espacios y guiones
    telefono = telefono.replace(/[\s-]/g, '');

    // Validar que solo contenga números
    if (!/^\d+$/.test(telefono)) {
      this.validations.telefono.message = 'El teléfono solo debe contener números';
      return false;
    }

    // Validar formato ecuatoriano (10 dígitos: 09XXXXXXXX o 02XXXXXXX, 03XXXXXXX, etc.)
    if (telefono.length !== 10) {
      this.validations.telefono.message = 'El teléfono debe tener 10 dígitos';
      return false;
    }

    // Validar que empiece con 0
    if (!telefono.startsWith('0')) {
      this.validations.telefono.message = 'El teléfono debe empezar con 0';
      return false;
    }

    this.validations.telefono.message = 'Teléfono válido';
    return true;
  }

  // Validar email
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || email.trim() === '') {
      this.validations.email.message = 'El correo es requerido';
      return false;
    }

    if (!email.includes('@')) {
      this.validations.email.message = 'El correo debe contener @';
      return false;
    }

    if (!emailRegex.test(email)) {
      this.validations.email.message = 'Correo inválido';
      return false;
    }

    this.validations.email.message = 'Correo válido';
    return true;
  }

  // Validaciones en tiempo real
  onCedulaChange() {
    this.validations.cedula.valid = this.validarCedulaEcuatoriana(this.userData.cedula);
  }

  onTelefonoChange() {
    this.validations.telefono.valid = this.validarTelefono(this.userData.telefono);
  }

  onEmailChange() {
    this.validations.email.valid = this.validarEmail(this.userData.email);
  }

  // Solo permitir números en cédula y teléfono
  onlyNumbers(event: any, field: string) {
    const value = event.target.value;
    const numbersOnly = value.replace(/[^\d]/g, '');
    
    if (field === 'cedula') {
      this.userData.cedula = numbersOnly.substring(0, 10);
    } else if (field === 'telefono') {
      this.userData.telefono = numbersOnly.substring(0, 10);
    }
  }

  async onCreateAccount() {
    // Validar todos los campos
    const cedulaValida = this.validarCedulaEcuatoriana(this.userData.cedula);
    const telefonoValido = this.validarTelefono(this.userData.telefono);
    const emailValido = this.validarEmail(this.userData.email);

    if (!this.userData.nombres || !this.userData.apellidos) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor completa todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!cedulaValida) {
      const alert = await this.alertCtrl.create({
        header: 'Cédula Inválida',
        message: this.validations.cedula.message,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!telefonoValido) {
      const alert = await this.alertCtrl.create({
        header: 'Teléfono Inválido',
        message: this.validations.telefono.message,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!emailValido) {
      const alert = await this.alertCtrl.create({
        header: 'Correo Inválido',
        message: this.validations.email.message,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Mostrar loading
    const loading = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
      spinner: 'crescent'
    });
    await loading.present();

    // Guardar en Google Sheets
    this.googleSheets.registerUser(this.userData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        
        if (response.success) {
          // Éxito
          const successAlert = await this.alertCtrl.create({
            header: '¡Cuenta Creada!',
            message: `Bienvenido ${this.userData.nombres} ${this.userData.apellidos}`,
            buttons: [{
              text: 'Continuar',
              handler: () => {
                this.navCtrl.navigateRoot('/login');
              }
            }]
          });
          await successAlert.present();
        } else {
          // Error desde el servidor
          const errorAlert = await this.alertCtrl.create({
            header: 'Error',
            message: response.message || 'No se pudo crear la cuenta',
            buttons: ['OK']
          });
          await errorAlert.present();
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error:', error);
        
        const errorAlert = await this.alertCtrl.create({
          header: 'Error de Conexión',
          message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    });
  }
}
