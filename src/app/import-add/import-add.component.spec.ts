import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAddComponent } from './import-add.component';

describe('ImportAddComponent', () => {
  let component: ImportAddComponent;
  let fixture: ComponentFixture<ImportAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
