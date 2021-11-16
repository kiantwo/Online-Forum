import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-banned',
  templateUrl: './banned.component.html',
  styleUrls: ['./banned.component.css']
})
export class BannedComponent implements AfterViewInit {
  @ViewChild('openModal') openModal!: ElementRef;

  constructor(public authService: AuthService) { }

  ngAfterViewInit(): void {
    //toggle modal
    this.openModal.nativeElement.click();
  }

}
