import { Component, OnInit } from '@angular/core';
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
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, navigateOutline } from 'ionicons/icons';

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
    IonBackButton
  ]
})
export class SolicitarPage implements OnInit {
  origen: string = '';
  destino: string = '';

  constructor() {
    addIcons({
      locationOutline,
      navigateOutline
    });
  }

  ngOnInit() {}

  solicitarTaxi() {
    console.log('Solicitando taxi desde:', this.origen, 'hasta:', this.destino);
  }
}