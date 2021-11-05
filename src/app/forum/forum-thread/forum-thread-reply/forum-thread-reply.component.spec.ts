import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThreadReplyComponent } from './forum-thread-reply.component';

describe('ForumThreadReplyComponent', () => {
  let component: ForumThreadReplyComponent;
  let fixture: ComponentFixture<ForumThreadReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumThreadReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumThreadReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
