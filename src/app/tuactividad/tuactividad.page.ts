import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonFooter,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  settingsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tuactividad',
  templateUrl: './tuactividad.page.html',
  styleUrls: ['./tuactividad.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonFooter,
    IonButtons,
    IonButton,
    IonIcon,
  ]
})
export class TuactividadPage {
  constructor(private navCtrl: NavController) {
    addIcons({
      homeOutline,
      settingsOutline,
    });
  }

  goToHome() {
    this.navCtrl.navigateRoot('/folder');
  }

  goToConfig() {
    this.navCtrl.navigateForward('/configuracion');
  }
}
