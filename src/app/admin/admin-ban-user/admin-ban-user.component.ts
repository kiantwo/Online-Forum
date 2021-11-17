import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-ban-user',
  templateUrl: './admin-ban-user.component.html',
  styleUrls: ['./admin-ban-user.component.css']
})
export class AdminBanUserComponent implements OnInit {
  @Input() user: any;
  @Output() banSuccess = new EventEmitter<any>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClick() {
    const banStatus = !this.user.isBanned;
    this.authService.banUser(this.user.uid, banStatus);
    this.banSuccess.emit(this.user.uid);
  }
}
