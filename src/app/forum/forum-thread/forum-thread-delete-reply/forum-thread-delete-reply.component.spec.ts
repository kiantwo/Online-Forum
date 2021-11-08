import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThreadDeleteReplyComponent } from './forum-thread-delete-reply.component';

describe('ForumThreadDeleteReplyComponent', () => {
  let component: ForumThreadDeleteReplyComponent;
  let fixture: ComponentFixture<ForumThreadDeleteReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumThreadDeleteReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumThreadDeleteReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
