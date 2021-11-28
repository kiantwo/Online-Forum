import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThreadDeleteThreadComponent } from './forum-thread-delete-thread.component';

describe('ForumThreadDeleteThreadComponent', () => {
  let component: ForumThreadDeleteThreadComponent;
  let fixture: ComponentFixture<ForumThreadDeleteThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumThreadDeleteThreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumThreadDeleteThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
