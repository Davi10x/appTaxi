import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonBackButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  helpCircleOutline,
  homeOutline,
  settingsOutline,
  personCircleOutline,
  notificationsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonBackButton
  ]
})
export class SoportePage {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    addIcons({
      'help-circle-outline': helpCircleOutline,
      'home-outline': homeOutline,
      'settings-outline': settingsOutline,
      'person-circle-outline': personCircleOutline,
      'notifications-outline': notificationsOutline,
    });
  }

  async solicitarAyuda() {
    const alert = await this.alertCtrl.create({
      header: 'Solicitar Ayuda',
      message: 'Describe tu problema y nos pondremos en contacto contigo lo antes posible.',
      inputs: [
        {
          name: 'mensaje',
          type: 'textarea',
          placeholder: 'Escribe tu consulta aquí...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.mensaje) {
              this.mostrarConfirmacion('Tu solicitud ha sido enviada. Te contactaremos pronto.');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async reportarActividad() {
    const alert = await this.alertCtrl.create({
      header: 'Reportar Actividad Sospechosa',
      message: 'Por favor describe la actividad sospechosa que deseas reportar.',
      inputs: [
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder: 'Describe la actividad...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Reportar',
          handler: (data) => {
            if (data.descripcion) {
              this.mostrarConfirmacion('Tu reporte ha sido enviado. Gracias por tu colaboración.');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async verGuias() {
    const alert = await this.alertCtrl.create({
      header: 'Guías de Uso',
      message: `
        <p><strong>Cómo solicitar un taxi:</strong></p>
        <p>1. Ve a "Solicitar Taxi"</p>
        <p>2. Selecciona tu ubicación en el mapa</p>
        <p>3. Confirma tu destino</p>
        <p>4. Espera la confirmación del conductor</p>
        <br>
        <p><strong>Cómo ver tu actividad:</strong></p>
        <p>Accede a "Tu Actividad" para ver el historial de viajes.</p>
      `,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async verPreguntas() {
    const alert = await this.alertCtrl.create({
      header: 'Preguntas Frecuentes',
      message: `
        <p><strong>¿Cómo puedo cambiar mi perfil?</strong></p>
        <p>Ve a Editar Perfil desde el menú.</p>
        <br>
        <p><strong>¿Puedo cancelar un viaje?</strong></p>
        <p>Sí, pero pueden aplicarse cargos.</p>
        <br>
        <p><strong>¿Es segura mi información?</strong></p>
        <p>Sí, todos tus datos están protegidos.</p>
      `,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async verPoliticas() {
    const alert = await this.alertCtrl.create({
      header: 'Políticas',
      message: `
        <p><strong>Política de Privacidad</strong></p>
        <p>Tu información está protegida y no se comparte con terceros.</p>
        <br>
        <p><strong>Términos de Servicio</strong></p>
        <p>Al usar la app aceptas nuestros términos y condiciones.</p>
        <br>
        <p><strong>Política de Cancelación</strong></p>
        <p>Las cancelaciones después de 2 minutos pueden tener cargo.</p>
      `,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async mostrarConfirmacion(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  goHome() {
    this.navCtrl.navigateBack('/folder');
  }

  goConfig() {
    this.navCtrl.navigateForward('/configuracion');
  }
}
