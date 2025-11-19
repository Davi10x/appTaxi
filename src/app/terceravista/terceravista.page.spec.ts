import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerceravistaPage } from './terceravista.page';

describe('TerceravistaPage', () => {
  let component: TerceravistaPage;
  let fixture: ComponentFixture<TerceravistaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerceravistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
