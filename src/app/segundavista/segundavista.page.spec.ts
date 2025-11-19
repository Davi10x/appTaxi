import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegundavistaPage } from './segundavista.page';

describe('SegundavistaPage', () => {
  let component: SegundavistaPage;
  let fixture: ComponentFixture<SegundavistaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundavistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
