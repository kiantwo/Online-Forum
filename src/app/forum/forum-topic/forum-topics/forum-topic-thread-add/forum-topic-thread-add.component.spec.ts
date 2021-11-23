import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicThreadAddComponent } from './forum-topic-thread-add.component';

describe('ForumTopicThreadAddComponent', () => {
  let component: ForumTopicThreadAddComponent;
  let fixture: ComponentFixture<ForumTopicThreadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTopicThreadAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicThreadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
