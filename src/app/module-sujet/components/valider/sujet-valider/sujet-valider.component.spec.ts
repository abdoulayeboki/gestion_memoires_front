import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetValiderComponent } from './sujet-valider.component';

describe('SujetValiderComponent', () => {
  let component: SujetValiderComponent;
  let fixture: ComponentFixture<SujetValiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetValiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
