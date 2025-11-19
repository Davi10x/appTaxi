import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TuactividadPage } from './tuactividad.page';

describe('TuactividadPage', () => {
  let component: TuactividadPage;
  let fixture: ComponentFixture<TuactividadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TuactividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
