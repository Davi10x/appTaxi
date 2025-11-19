import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonBackButton,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ]
})
export class ForgotPasswordPage {
  contactInfo: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async onSubmit() {
    if (this.contactInfo) {
      const alert = await this.alertController.create({
        header: 'Recuperación enviada',
        message: `Se han enviado las instrucciones de recuperación a: ${this.contactInfo}`,
        buttons: [{
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateBack('/login');
          }
        }]
      });

      await alert.present();
    }
  }
}