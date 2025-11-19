import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
import * as L from 'leaflet';
import { addIcons } from 'ionicons';
import {
  helpCircleOutline,
  homeOutline,
  settingsOutline,
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
export class SoportePage implements AfterViewInit {
  private map!: any;

  constructor(private navCtrl: NavController) { }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // Coordenadas de El Empalme
    const lat = -1.0461;
    const lng = -79.6446;

    // Inicializar el mapa
    this.map = L.map('map').setView([lat, lng], 15);

    // Agregar la capa de OpenStreetMap (gratuito)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Agregar un marcador en El Empalme
    const marker = L.marker([lat, lng]).addTo(this.map);
    marker.bindPopup('El Empalme').openPopup();
  }

  goToConfig() {
    this.navCtrl.navigateForward('/configuracion');
  }

  noop() {
   
  }
}
