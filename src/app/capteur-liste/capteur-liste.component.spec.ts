import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapteurListeComponent } from './capteur-liste.component';

describe('CapteurListeComponent', () => {
  let component: CapteurListeComponent;
  let fixture: ComponentFixture<CapteurListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapteurListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapteurListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
