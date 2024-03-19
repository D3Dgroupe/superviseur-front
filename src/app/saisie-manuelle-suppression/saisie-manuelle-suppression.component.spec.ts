import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionManuelleComponent } from './saisie-manuelle-suppression.component';

describe('SuppressionManuelleComponent', () => {
  let component: SuppressionManuelleComponent;
  let fixture: ComponentFixture<SuppressionManuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppressionManuelleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppressionManuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
