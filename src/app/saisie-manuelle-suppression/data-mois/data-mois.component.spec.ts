import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMoisComponent } from './data-mois.component';

describe('DataMoisComponent', () => {
  let component: DataMoisComponent;
  let fixture: ComponentFixture<DataMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataMoisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
