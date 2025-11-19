import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-terceravista',
  templateUrl: './terceravista.page.html',
  styleUrls: ['./terceravista.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ]
})
export class TerceravistaPage {
  constructor() { }
}
