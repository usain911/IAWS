import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../shared/login';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../shared/user';
import { NewUser } from '../shared/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  nutzer: User;
  login: Login;
  isLoggedIn: string;
  private REST_API_SERVER = "http://localhost:3000/users";
  private restLive = "https://localhost:44372/api/Nutzer";

  constructor(private router: Router, private httpClient: HttpClient) { }

  checkLogin(status: string) {
    if(status == "false") {
      console.log(status);
      this.router.navigate(['/login']);
    }
  }

  handleError1(error: HttpErrorResponse) {
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
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }



   getUserByLogin(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.REST_API_SERVER}/${id}`)
  }

  addUser(user: NewUser): Observable<NewUser> {
    return this.httpClient.post<NewUser>(this.restLive, user)
    .pipe(
      catchError(this.handleError)
    );
  }
  //-------------------------------------------------------------------------------
  //-----------------------------------LIVE----------------------------------------
  //-------------------------------------------------------------------------------
  getUserByNutzername(nutzername: string) {
    return this.httpClient.get<User>(`${this.restLive}/GetNutzerByNutzername/${nutzername}`)
  }  
}

const httpOptions = {
  headers: new HttpHeaders({     
    'Content-Type': 'text/plain',
    //'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};