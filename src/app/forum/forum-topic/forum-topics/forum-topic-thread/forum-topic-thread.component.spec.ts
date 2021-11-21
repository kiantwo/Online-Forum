import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicThreadComponent } from './forum-topic-thread.component';

describe('ForumTopicThreadComponent', () => {
  let component: ForumTopicThreadComponent;
  let fixture: ComponentFixture<ForumTopicThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTopicThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
