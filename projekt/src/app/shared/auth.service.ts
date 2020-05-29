import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { User } from '../shared/user';
//import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  nutzer: User;
  login: Login;
  isLoggedIn: string;
  private REST_API_SERVER = "http://localhost:3000/users";

  constructor(private router: Router, private httpClient: HttpClient) { }

  checkLogin(status: string) {
    if(status == "false") {
      console.log(status);
      this.router.navigate(['/login']);
    }
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  authLogin(login: Login) {    
    //let user: User;
    let nutzer = this.getUserByLogin();
    console.log("Login: "+login + "UserLogin= " + this.nutzer.name);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  }

   getUserByLogin(): Observable<User> {
    let id = 1;
    const url = `${this.REST_API_SERVER}/${id}`;
    return this.httpClient.get<User>(url)
  }

  async getUser() {
    let id = 1;
    const url = `${this.REST_API_SERVER}/${id}`;
    const promise = await this.httpClient.get(url).toPromise();
    console.log("promise: " + promise); 
  }
}
