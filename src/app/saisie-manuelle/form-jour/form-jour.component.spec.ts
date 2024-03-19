import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJourComponent } from './form-jour.component';

describe('FormJourComponent', () => {
  let component: FormJourComponent;
  let fixture: ComponentFixture<FormJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormJourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
