import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonItemDivider,
  IonItemGroup,
  IonAvatar,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonToggle,
    IonItemDivider,
    IonItemGroup,
    IonAvatar,
    IonIcon,
  ]
})
export class EditarPerfilPage {
  profileImage = 'assets/icon/usuario.png';
  hasChanges = false;

  userData = {
    nombre: '',
    telefono: '',
    email: '',
    notificaciones: true,
    ubicacion: true
  };

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    addIcons({ cameraOutline });
  }

  onChange() {
    this.hasChanges = true;
  }

  async guardarCambios() {
    if (this.hasChanges) {
      const alert = await this.alertCtrl.create({
        header: 'Confirmar cambios',
        message: '¿Estás seguro de que quieres guardar los cambios?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Guardar',
            handler: () => {
              // Aquí guardaríamos los cambios en una base de datos
              // Por ahora solo navegamos de vuelta
              this.navCtrl.pop();
            }
          }
        ]
      });

      await alert.present();
    } else {
      this.navCtrl.pop();
    }
  }

  async cambiarFoto() {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar foto de perfil',
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => {
            // Implementar lógica de cámara
          }
        },
        {
          text: 'Elegir de galería',
          handler: () => {
            // Implementar lógica de galería
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async eliminarCuenta() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar cuenta',
      message: '¿Estás seguro? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            // Aquí iría la lógica para eliminar la cuenta
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}