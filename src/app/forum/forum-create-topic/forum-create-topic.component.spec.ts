import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCreateTopicComponent } from './forum-create-topic.component';

describe('ForumCreateTopicComponent', () => {
  let component: ForumCreateTopicComponent;
  let fixture: ComponentFixture<ForumCreateTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCreateTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCreateTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
