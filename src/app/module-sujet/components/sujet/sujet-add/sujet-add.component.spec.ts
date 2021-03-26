import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetAddComponent } from './sujet-add.component';

describe('SujetAddComponent', () => {
  let component: SujetAddComponent;
  let fixture: ComponentFixture<SujetAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
