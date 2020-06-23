import { Injectable } from '@angular/core';
import { User } from './user';
import { Projekt } from './projekt';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Aufgaben } from './aufgaben';




@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private REST_API_SERVER = "http://localhost:3000/";
  private restLive = "https://localhost:44372/api/Nutzer";
  private api = "https://localhost:44372/api/";
  user: User;
 
  projects : Projekt[];  

  constructor(private httpClient: HttpClient) { 
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
  

  //-------------------------------------------------------------------------------
  //-----------------------------------USER----------------------------------------
  //-------------------------------------------------------------------------------

  public getLocalUser(){
    //const options = { params: new HttpParams({fromString: "_page=1&_limit=3"}) }; // limitiert auf 3 user
    return this.httpClient.get<User[]>(this.REST_API_SERVER+"users").pipe(retry(3), catchError(this.handleError));
  }

  public getUserById(id: number){
    return this.httpClient.get<User[]>(`${this.api}Nutzer/${id}`).pipe(retry(3), catchError(this.handleError));
  }
  //-------------------------------------------------------------------------------
  //-----------------------------------TEAMS----------------------------------------
  //-------------------------------------------------------------------------------

  public getTeams(){
    return this.httpClient.get<any>(this.REST_API_SERVER+"teams").pipe(retry(3), catchError(this.handleError));
  }


  //-------------------------------------------------------------------------------
  //-----------------------------------LIVE----------------------------------------
  //-------------------------------------------------------------------------------

  public getUser(){
    const header = new HttpHeaders({
      'Access-Control-Allow-Headers': '*'
    });
    //const options = { params: new HttpParams({fromString: "_page=1&_limit=3"}) }; // limitiert auf 3 user
    return this.httpClient.get<User[]>('https://localhost:44372/api/Nutzer');
  }

  //-------------------------------------------------------------------------------
  //----------------------------------PROJEKTE-------------------------------------
  //-------------------------------------------------------------------------------

  public getProjects():Observable<Projekt[]> {
    return this.httpClient.get<Projekt[]>(`${this.api}Projekte`).pipe(retry(3), catchError(this.handleError));
  } 
  public getProjectById(id: number): Observable<Projekt>{
    return this.httpClient.get<any>(`${this.api}projekte/${id}`).pipe(retry(3), catchError(this.handleError));
  } 
  public getProjectsByOwner(owner: number) {
    return this.httpClient.get<any>(`${this.api}Projekte/`).pipe(retry(3), catchError(this.handleError));

    //return this.httpClient.get<any>(`${this.api}Projekte/GetProjektByOwnerID/1`).pipe(retry(3), catchError(this.handleError));
  }
//----------------------------------PROJEKTE-LIVE---------------------------------
  public addProjekt(pr: Projekt):Observable<Projekt>{
    return this.httpClient.post<any>(`${this.api}NutzerProjekte`, pr)
  }
  //-------------------------------------------------------------------------------
  //----------------------------------Aufgaben-------------------------------------
  //-------------------------------------------------------------------------------
  public getAufgaben() {
    return  this.httpClient.get<any>(`${this.api}Aufgaben`).pipe(retry(3), catchError(this.handleError));
  }
  public getNutzerAufgaben() {
    return  this.httpClient.get<any>(`${this.api}NutzerAufgaben/GetNutzerIdByAufgabenId/1`).pipe(retry(3), catchError(this.handleError));
  }
  
  //-------------------------------------------------------------------------------
  //----------------------------------Aufgaben-------------------------------------
  //-------------------------------------------------------------------------------
  public getTeilAufgaben() {
    return  this.httpClient.get<any>(`${this.api}Teilaufgaben`).pipe(retry(3), catchError(this.handleError));
  }
}





const httpOptions = {
  headers: new HttpHeaders({     
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'plain/text',
    //'Authorization': 'my-auth-token'
  })
};