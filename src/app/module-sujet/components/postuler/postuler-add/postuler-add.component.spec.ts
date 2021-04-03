import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulerAddComponent } from './postuler-add.component';

describe('PostulerAddComponent', () => {
  let component: PostulerAddComponent;
  let fixture: ComponentFixture<PostulerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
