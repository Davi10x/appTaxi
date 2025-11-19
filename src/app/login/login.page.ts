import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonIcon,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class LoginPage {
  constructor(private navCtrl: NavController) {
    addIcons({ personOutline, lockClosedOutline });
  }

  onLogin() {
    // Lógica para iniciar sesión
    // Por ejemplo, navegar a la página principal
    this.navCtrl.navigateRoot('/folder');
  }

  forgotPassword() {
    // Navegar a la página de recuperación de contraseña
    this.navCtrl.navigateForward('/forgot-password');
  }

  createAccount() {
    // Navegar a la página de creación de cuenta
    this.navCtrl.navigateForward('/crear');
  }
}