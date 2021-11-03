import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThreadBlockComponent } from './forum-thread-block.component';

describe('ForumThreadBlockComponent', () => {
  let component: ForumThreadBlockComponent;
  let fixture: ComponentFixture<ForumThreadBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumThreadBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumThreadBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
