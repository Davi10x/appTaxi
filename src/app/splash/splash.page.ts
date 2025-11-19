import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { carOutline } from 'ionicons/icons';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class SplashPage implements OnInit {
  constructor(private navCtrl: NavController) {
    addIcons({ carOutline });
  }

  ngOnInit() {
  
    setTimeout(() => {
      this.navCtrl.navigateRoot('/login');
    }, 1500);
  }
}