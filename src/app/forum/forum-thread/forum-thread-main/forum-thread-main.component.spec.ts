import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThreadMainComponent } from './forum-thread-main.component';

describe('ForumThreadMainComponent', () => {
  let component: ForumThreadMainComponent;
  let fixture: ComponentFixture<ForumThreadMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumThreadMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumThreadMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
