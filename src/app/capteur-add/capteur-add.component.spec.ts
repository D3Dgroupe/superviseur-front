import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapteurAddComponent } from './capteur-add.component';

describe('CapteurAddComponent', () => {
  let component: CapteurAddComponent;
  let fixture: ComponentFixture<CapteurAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapteurAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapteurAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
