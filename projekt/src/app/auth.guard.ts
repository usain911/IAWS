import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.verifyLogin();
  }

  



  verifyLogin() : boolean{
    if(!this.isLoggedIn()) {
      this.router.navigate(['./login']);
      return false;
    }
    else if(this.isLoggedIn()){
      return true;
    }
  }

  public isLoggedIn(): boolean{
    let status = false;
    if( localStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else{
      status = false;
    }
    return status;
  }

  public isPl(): boolean {

    return true;
  }

  public isAdmin(): boolean{
    let status = false;
    if(localStorage.getItem('isAdmin')) {
      return true
    }
    else false
    
  }

  
}
