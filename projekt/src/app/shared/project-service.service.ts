import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private REST_API_SERVER = "http://localhost:3000/users";
  user: User;

  constructor(private httpClient: HttpClient) { 
    this.user = new User(1, 'Max', 'Mustermann', '123');
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

  public sendGetRequest(){
    const options = { params: new HttpParams({fromString: "_page=1&_limit=3"}) }; // limitiert auf 3 user
    return this.httpClient.get<User[]>(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }

  getAll() {
    return this.user;
  }
}


