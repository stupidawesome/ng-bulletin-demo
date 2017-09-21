import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBuilderComponent } from './post-builder.component';

describe('PostBuilderComponent', () => {
  let component: PostBuilderComponent;
  let fixture: ComponentFixture<PostBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
