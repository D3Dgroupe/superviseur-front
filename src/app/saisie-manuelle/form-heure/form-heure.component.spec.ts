import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeureComponent } from './form-heure.component';

describe('FormHeureComponent', () => {
  let component: FormHeureComponent;
  let fixture: ComponentFixture<FormHeureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormHeureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
