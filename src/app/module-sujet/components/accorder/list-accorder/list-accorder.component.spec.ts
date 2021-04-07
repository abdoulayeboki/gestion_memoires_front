import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccorderComponent } from './list-accorder.component';

describe('ListAccorderComponent', () => {
  let component: ListAccorderComponent;
  let fixture: ComponentFixture<ListAccorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
