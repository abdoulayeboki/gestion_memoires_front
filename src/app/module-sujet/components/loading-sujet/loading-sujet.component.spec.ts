import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSujetComponent } from './loading-sujet.component';

describe('LoadingSujetComponent', () => {
  let component: LoadingSujetComponent;
  let fixture: ComponentFixture<LoadingSujetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSujetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
