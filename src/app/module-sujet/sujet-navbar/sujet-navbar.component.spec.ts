import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetNavbarComponent } from './sujet-navbar.component';

describe('SujetNavbarComponent', () => {
  let component: SujetNavbarComponent;
  let fixture: ComponentFixture<SujetNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
