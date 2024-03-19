import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportListeComponent } from './import-liste.component';

describe('ImportListeComponent', () => {
  let component: ImportListeComponent;
  let fixture: ComponentFixture<ImportListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
