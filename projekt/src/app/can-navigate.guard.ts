import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanNavigate implements CanActivate {
  constructor(private router: Router) {}
  accessGranted = false;
  ok = false;

  canActivate(): boolean {
    if (!this.accessGranted) {
      if (localStorage.getItem('isLoggedIn')==='true')
        return true
    }
    this.router.navigate(['/login']);
    return this.ok;
  }
}