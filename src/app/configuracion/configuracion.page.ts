import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonFooter,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  settingsOutline,
  personOutline,
  logOutOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonIcon,
    IonFooter,
    IonButtons,
    IonButton,
  ]
})
export class ConfiguracionPage {
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {
    addIcons({
      homeOutline,
      settingsOutline,
      personOutline,
      logOutOutline,
    });
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, cerrar sesión',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  goToHome() {
    this.navCtrl.navigateRoot('/folder');
  }

  logout() {
   
    console.log('Cerrando sesión...');
  }
}
