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

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }

   getUserByLogin(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.REST_API_SERVER}/${id}`)
  }
}
