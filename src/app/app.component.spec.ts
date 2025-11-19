import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IonAlert, IonButton } from '@ionic/angular/standalone';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
  styleUrls: ['example.component.css'],
  imports: [IonAlert, IonButton],
})
export class ExampleComponent {
  alertButtons = ['Action'];
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have menu labels', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].textContent).toContain('Inbox');
    expect(menuItems[1].textContent).toContain('Outbox');
  });

  it('should have urls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].getAttribute('href')).toEqual(
      '/folder/inbox'
    );
    expect(menuItems[1].getAttribute('href')).toEqual(
      '/folder/outbox'
    );
  });
});
