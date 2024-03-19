import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieManuelleComponent } from './saisie-manuelle.component';

describe('SaisieManuelleComponent', () => {
  let component: SaisieManuelleComponent;
  let fixture: ComponentFixture<SaisieManuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisieManuelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaisieManuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
