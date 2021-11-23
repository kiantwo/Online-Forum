import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicThreadEditComponent } from './forum-topic-thread-edit.component';

describe('ForumTopicThreadEditComponent', () => {
  let component: ForumTopicThreadEditComponent;
  let fixture: ComponentFixture<ForumTopicThreadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumTopicThreadEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTopicThreadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
