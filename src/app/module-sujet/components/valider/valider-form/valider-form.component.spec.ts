import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderFormComponent } from './valider-form.component';

describe('ValiderFormComponent', () => {
  let component: ValiderFormComponent;
  let fixture: ComponentFixture<ValiderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
