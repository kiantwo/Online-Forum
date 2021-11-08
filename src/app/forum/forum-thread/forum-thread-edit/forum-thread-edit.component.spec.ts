import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThreadEditComponent } from './forum-thread-edit.component';

describe('ForumThreadEditComponent', () => {
  let component: ForumThreadEditComponent;
  let fixture: ComponentFixture<ForumThreadEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumThreadEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumThreadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
