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

  private local = "http://localhost:3000/";
  private api = "https://localhost:44372/api/";
  

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

  public getUserById(id: number):Observable<any> {
    return this.httpClient.get<any>(`${this.api}Nutzer/${id}`).pipe(retry(3), catchError(this.handleError));
  }

  public getUser(){
    const header = new HttpHeaders({
      'Access-Control-Allow-Headers': '*'
    });
    //const options = { params: new HttpParams({fromString: "_page=1&_limit=3"}) }; // limitiert auf 3 user
    return this.httpClient.get<User[]>('https://localhost:44372/api/Nutzer');
  }


  //-------------------------------------------------------------------------------
  //-----------------------------------TEAMS----------------------------------------
  //-------------------------------------------------------------------------------

  public getTeams(){
    return this.httpClient.get<any>(this.local+"teams").pipe(retry(3), catchError(this.handleError));
  }

 
  //-------------------------------------------------------------------------------
  //----------------------------------PROJEKTE-------------------------------------
  //-------------------------------------------------------------------------------

  public getProjects():Observable<Projekt[]> {
    return this.httpClient.get<Projekt[]>(`${this.api}Projekte`).pipe(retry(3), catchError(this.handleError));
  } 
  public getProjectById(id: number): Observable<Projekt>{
    return this.httpClient.get<Projekt>(`${this.api}projekte/${id}`).pipe(retry(3), catchError(this.handleError));
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
  public getAufgaben():Observable<any> {
    return  this.httpClient.get<Aufgaben[]>(`${this.api}Aufgaben`).pipe(retry(5), catchError(this.handleError));
  }
  public getNutzerAufgaben() {
    return  this.httpClient.get<any>(`${this.api}NutzerAufgaben/GetNutzerIdByAufgabenId/1`).pipe(retry(3), catchError(this.handleError));
  }

  //-------------------------------------------------------------------------------
  //----------------------------------Teilaufgaben---------------------------------
  //-------------------------------------------------------------------------------
  public getTeilAufgaben() {
    return  this.httpClient.get<any>(`${this.api}Teilaufgaben`).pipe(retry(3), catchError(this.handleError));
  }
  //-------------------------------------------------------------------------------
  //----------------------------------Kommentare-----------------------------------
  //-------------------------------------------------------------------------------
  public getKommentare() {
    return this.httpClient.get<any>(`${this.api}Kommentar`).pipe(retry(3), catchError(this.handleError));
  }
}





const httpOptions = {
  headers: new HttpHeaders({     
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'plain/text',
  })
};