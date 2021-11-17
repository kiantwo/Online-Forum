import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBanUserComponent } from './admin-ban-user.component';

describe('AdminBanUserComponent', () => {
  let component: AdminBanUserComponent;
  let fixture: ComponentFixture<AdminBanUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBanUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
