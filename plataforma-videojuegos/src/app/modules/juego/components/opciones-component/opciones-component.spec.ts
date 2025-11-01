import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesComponent } from './opciones-component';

describe('OpcionesComponent', () => {
  let component: OpcionesComponent;
  let fixture: ComponentFixture<OpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
