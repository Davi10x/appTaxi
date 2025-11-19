import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-segundavista',
  templateUrl: './segundavista.page.html',
  styleUrls: ['./segundavista.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class SegundavistaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
