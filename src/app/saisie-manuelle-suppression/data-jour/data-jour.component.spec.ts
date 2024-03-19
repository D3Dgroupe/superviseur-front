import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataJourComponent } from './data-jour.component';

describe('DataJourComponent', () => {
  let component: DataJourComponent;
  let fixture: ComponentFixture<DataJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataJourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
