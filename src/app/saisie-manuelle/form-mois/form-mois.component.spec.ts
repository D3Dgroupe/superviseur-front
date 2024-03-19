import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMoisComponent } from './form-mois.component';

describe('FormMoisComponent', () => {
  let component: FormMoisComponent;
  let fixture: ComponentFixture<FormMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMoisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
