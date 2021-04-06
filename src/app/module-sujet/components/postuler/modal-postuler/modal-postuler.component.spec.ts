import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPostulerComponent } from './modal-postuler.component';

describe('ModalPostulerComponent', () => {
  let component: ModalPostulerComponent;
  let fixture: ComponentFixture<ModalPostulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPostulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPostulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
