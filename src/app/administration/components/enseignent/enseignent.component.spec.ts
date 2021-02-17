import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignentComponent } from './enseignent.component';

describe('EnseignentComponent', () => {
  let component: EnseignentComponent;
  let fixture: ComponentFixture<EnseignentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
