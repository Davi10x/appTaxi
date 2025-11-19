import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonFooter,
  PopoverController,
} from '@ionic/angular/standalone';
import { NotificationsPopoverComponent } from '../components/notifications-popover.component';
import { addIcons } from 'ionicons';
import { 
  notificationsOutline, 
  carOutline, 
  listOutline, 
  helpCircleOutline,
  locationOutline,
  homeOutline,
  settingsOutline,
  chevronForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonAvatar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonFooter,
    NotificationsPopoverComponent,
  ]
})
export class FolderPage {
  locations = [
    {
      title: 'Sede 15 de Diciembre',
      address: 'Av. Manabí',
      image: 'assets/icon/sede1.jpg'
    },
    {
      title: 'Ubicación 1',
      address: 'Supermercado Aki',
      image: 'assets/icon/ubicacion1.jpg'
    },
    {
      title: 'Ubicación 2',
      address: 'Supermercado Tuti',
      image: 'assets/icon/ubicacion2.jpg'
    },
    {
      title: 'Ubicación 3',
      address: 'Obelisco',
      image: 'assets/icon/ubicacion3.jpg'
    }
  ];

  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController
  ) {
    addIcons({
      notificationsOutline,
      carOutline,
      listOutline,
      helpCircleOutline,
      locationOutline,
      homeOutline,
      settingsOutline,
      chevronForwardOutline
    });
  }

  goToActivity() {
    this.navCtrl.navigateForward('/tuactividad');
  }

  goToSupport() {
    this.navCtrl.navigateForward('/soporte');
  }

  goToConfig() {
    this.navCtrl.navigateForward('/configuracion');
  }

  goToEditProfile() {
    this.navCtrl.navigateForward('/editar-perfil');
  }

  goToSolicitar() {
    this.navCtrl.navigateForward('/solicitar');
  }

  async showNotifications(event: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsPopoverComponent,
      event: event,
      translucent: true,
      showBackdrop: true,
      backdropDismiss: true,
      alignment: 'end'
    });

    await popover.present();
  }

}
