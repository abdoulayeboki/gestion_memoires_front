import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetEditComponent } from './sujet-edit.component';

describe('SujetEditComponent', () => {
  let component: SujetEditComponent;
  let fixture: ComponentFixture<SujetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
