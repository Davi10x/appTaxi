import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonContent,
  IonNote,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  timeOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-notifications-popover',
  template: `
    <ion-content class="notifications-popover">
      <ion-list>
        <ion-item *ngIf="notifications.length === 0" lines="none">
          <ion-label class="no-notifications">
            No hay notificaciones nuevas
          </ion-label>
        </ion-item>
        <ion-item *ngFor="let notification of notifications" [class.unread]="!notification.read">
          <ion-icon [name]="notification.icon" slot="start" [class]="notification.type"></ion-icon>
          <ion-label>
            <h2>{{ notification.title }}</h2>
            <p>{{ notification.message }}</p>
          </ion-label>
          <ion-note slot="end">{{ notification.time }}</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styles: [`
    .notifications-popover {
      width: 300px;
      max-height: 400px;
    }

    ion-item {
      --padding-start: 16px;
      --padding-end: 16px;
      --padding-top: 12px;
      --padding-bottom: 12px;

      &.unread {
        --background: rgba(var(--ion-color-primary-rgb), 0.05);
      }
    }

    .no-notifications {
      text-align: center;
      color: var(--ion-color-medium);
      padding: 20px;
    }

    ion-icon {
      font-size: 24px;
      margin-right: 16px;

      &.success {
        color: var(--ion-color-success);
      }

      &.warning {
        color: var(--ion-color-warning);
      }

      &.info {
        color: var(--ion-color-primary);
      }
    }

    ion-note {
      font-size: 12px;
      margin-top: 4px;
    }

    h2 {
      font-weight: 600;
      font-size: 14px;
      margin: 0 0 4px;
    }

    p {
      color: var(--ion-color-medium);
      font-size: 13px;
      margin: 0;
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonContent,
    IonNote,
  ]
})
export class NotificationsPopoverComponent {
  notifications = [
    {
      icon: 'checkmark-circle-outline',
      type: 'success',
      title: 'Viaje completado',
      message: 'Tu último viaje ha sido completado exitosamente',
      time: 'Hace 5 min',
      read: false
    },
    {
      icon: 'time-outline',
      type: 'info',
      title: 'Taxi en camino',
      message: 'Tu taxi está en camino a tu ubicación',
      time: 'Hace 10 min',
      read: true
    },
    {
      icon: 'alert-circle-outline',
      type: 'warning',
      title: 'Actualización importante',
      message: 'Hay una nueva actualización disponible',
      time: 'Hace 1 hora',
      read: true
    }
  ];

  constructor() {
    addIcons({
      timeOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
    });
  }
}