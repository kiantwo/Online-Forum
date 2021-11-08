import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //calls isLoggedIn function from AuthService
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate([''])
    }

    //check if user is admin
    if(next.data['role'] === 'ROLE_ADMIN' && this.authService.isAdmin !== true) {
      this.router.navigate(['']);
    }
    
    return true;
  }
}
