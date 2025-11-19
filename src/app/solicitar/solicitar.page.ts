import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonItem,
  IonInput,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
  LoadingController,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, navigateOutline, locateOutline } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.page.html',
  styleUrls: ['./solicitar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonItem,
    IonInput,
    IonButtons,
    IonBackButton,
    IonFab,
    IonFabButton
  ]
})
export class SolicitarPage implements OnInit, AfterViewInit {
  origen: string = '';
  destino: string = '';
  
  map: any;
  currentMarker: any;
  destinationMarker: any;
  directionsService: any;
  directionsRenderer: any;
  
  distancia: string = '--';
  tiempo: string = '--';
  costo: string = '--';

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    addIcons({
      locationOutline,
      navigateOutline,
      locateOutline
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  async initMap() {
    // Coordenadas por defecto (El Empalme, Ecuador)
    const defaultLocation = { lat: -1.0461, lng: -79.6446 };
    
    // Inicializar el mapa de Google
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
    });

    // Inicializar servicios de direcciones
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#fbbf24',
        strokeWeight: 5
      }
    });

    // Intentar obtener la ubicación actual
    await this.getCurrentLocation();
  }

  async getCurrentLocation() {
    const loading = await this.loadingCtrl.create({
      message: 'Obteniendo tu ubicación...',
    });
    await loading.present();

    try {
      // Solicitar permisos y obtener ubicación
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });

      const position = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };

      // Centrar el mapa en la ubicación actual
      this.map.setCenter(position);
      this.map.setZoom(16);

      // Agregar marcador de ubicación actual
      if (this.currentMarker) {
        this.currentMarker.setMap(null);
      }

      this.currentMarker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'Tu ubicación',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        }
      });

      // Obtener dirección aproximada usando Geocoding
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          this.origen = results[0].formatted_address;
        }
      });

      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      console.error('Error obteniendo ubicación:', error);
      
      const alert = await this.alertCtrl.create({
        header: 'Error de Ubicación',
        message: 'No se pudo obtener tu ubicación. Asegúrate de dar permisos de ubicación a la app.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async calcularRuta() {
    if (!this.origen || !this.destino) {
      const alert = await this.alertCtrl.create({
        header: 'Datos incompletos',
        message: 'Por favor ingresa origen y destino',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Calculando ruta...',
    });
    await loading.present();

    const request = {
      origin: this.origen,
      destination: this.destino,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, async (result: any, status: any) => {
      await loading.dismiss();
      
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
        
        const route = result.routes[0].legs[0];
        this.distancia = route.distance.text;
        this.tiempo = route.duration.text;
        
        // Calcular costo estimado ($0.50 por km)
        const distanciaKm = route.distance.value / 1000;
        const costoBase = 1.50;
        const costoPorKm = 0.50;
        const costoTotal = costoBase + (distanciaKm * costoPorKm);
        this.costo = costoTotal.toFixed(2);
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo calcular la ruta. Verifica las direcciones.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async solicitarTaxi() {
    if (this.distancia === '--') {
      const alert = await this.alertCtrl.create({
        header: 'Calcula la ruta',
        message: 'Primero debes calcular la ruta presionando el botón "Calcular Ruta"',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirmar Solicitud',
      message: `
        <p><strong>Origen:</strong> ${this.origen}</p>
        <p><strong>Destino:</strong> ${this.destino}</p>
        <p><strong>Distancia:</strong> ${this.distancia}</p>
        <p><strong>Tiempo:</strong> ${this.tiempo}</p>
        <p><strong>Costo:</strong> $${this.costo}</p>
      `,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Buscando conductor...',
            });
            await loading.present();

            // Simular búsqueda de conductor
            setTimeout(async () => {
              await loading.dismiss();
              
              const success = await this.alertCtrl.create({
                header: '¡Taxi confirmado!',
                message: 'Un conductor ha sido asignado. Llegará en aproximadamente 5 minutos.',
                buttons: ['OK']
              });
              await success.present();
            }, 2000);
          }
        }
      ]
    });

    await alert.present();
  }

  async centerOnMyLocation() {
    await this.getCurrentLocation();
  }
}