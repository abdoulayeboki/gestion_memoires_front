import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetViewComponent } from './sujet-view.component';

describe('SujetViewComponent', () => {
  let component: SujetViewComponent;
  let fixture: ComponentFixture<SujetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
