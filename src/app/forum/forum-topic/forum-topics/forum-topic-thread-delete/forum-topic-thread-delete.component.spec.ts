import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicThreadDeleteComponent } from './forum-topic-thread-delete.component';

describe('ForumTopicThreadDeleteComponent', () => {
  let component: ForumTopicThreadDeleteComponent;
  let fixture: ComponentFixture<ForumTopicThreadDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTopicThreadDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicThreadDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
