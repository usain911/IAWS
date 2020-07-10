import { Injectable } from '@angular/core';
import { User } from './user';
import { Projekt } from './projekt';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Aufgaben } from './aufgaben';
import { TeilAufgabe } from './teil-aufgabe';
import { Kommentar } from './kommentar';


@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

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

  getAllUser():Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.api}Nutzer`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );      
  }

  deleteUser(id: number):Observable<{}> {
    console.log('parameter = ' + id)
    const url = '${this.api}${id}';
    return this.httpClient.delete(`${this.api}Nutzer/${id}`).pipe(
      catchError(this.handleError)
    )
  }
 
  //-------------------------------------------------------------------------------
  //----------------------------------PROJEKTE-------------------------------------
  //-------------------------------------------------------------------------------

  public getProjects():Observable<Projekt[]> {
    return this.httpClient.get<any[]>(`${this.api}Projekte`).pipe(retry(3), catchError(this.handleError));
  } 
  public getProjectById(id: number): Observable<Projekt>{
    return this.httpClient.get<any>(`${this.api}projekte/${id}`).pipe(retry(3), catchError(this.handleError));
  } 
  public getProjectsByOwner(owner: number): Observable<Projekt[]> {
    return this.httpClient.get<Projekt[]>(`${this.api}Projekte/GetProjektByOwnerId/${owner}`);

    //return this.httpClient.get<any>(`${this.api}Projekte/GetProjektByOwnerID/1`).pipe(retry(3), catchError(this.handleError));
  }

  getAllSearch(searchTerm: string): Observable<Projekt[]> {
    return this.httpClient.get<Projekt[]>(
      `${this.api}Projekte/search/${searchTerm}`).pipe(retry(3), catchError(this.handleError)
      );    
  }

  public setProjekt(projekt: Projekt): Observable<Projekt> {
    console.log(projekt);
    return this.httpClient.post<Projekt>(`${this.api}Projekte`, projekt)
      .pipe(catchError(this.handleError)
    );
  }

  deleteProjekt(pId: number): Observable<any> {
    return this.httpClient.delete(
      `${this.api}Projekte/${pId}`,
      {responseType: 'text'}
      ).pipe(
        catchError(this.handleError)
      );
  }



  //-------------------------------------------------------------------------------
  //----------------------------------Aufgaben-------------------------------------
  //-------------------------------------------------------------------------------

  public getAufgaben():Observable<Aufgaben[]> {
    return  this.httpClient.get<Aufgaben[]>(`${this.api}Aufgaben`).pipe(retry(5), catchError(this.handleError));
  }
  public getNutzerAufgaben(): Observable<Aufgaben[]> {
    return  this.httpClient.get<Aufgaben[]>(`${this.api}NutzerAufgaben/GetNutzerIdByAufgabenId/1`).pipe(retry(3), catchError(this.handleError));
  }
  public getAufgabeById(id: number):Observable<Aufgaben> {
    return  this.httpClient.get<Aufgaben>(`${this.api}Aufgaben/${id}`).pipe(retry(3), catchError(this.handleError));
  }
  public getAufgabenByProjektId(pId: number): Observable<Aufgaben> {
    return  this.httpClient.get<Aufgaben>(`${this.api}Aufgaben/GetAufgabenByProjektId/${pId}`).pipe(retry(3), catchError(this.handleError));
  }
  public getAufgabenByErstellerId(pId: number): Observable<Aufgaben[]> {
    return  this.httpClient.get<Aufgaben[]>(`${this.api}Aufgaben/GetAufgabenByErstellerId/${pId}`).pipe(retry(3), catchError(this.handleError));
  }

  public addAufgabe(auf: Aufgaben): Observable<Aufgaben> {
    console.log(auf);
    return this.httpClient.post<Aufgaben>(`${this.api}Aufgaben`, auf)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateAufgabe(aufgabe: Aufgaben): Observable<Aufgaben> {
    console.log("aufgbabe: " + aufgabe)
    return this.httpClient.put<Aufgaben>(this.api, aufgabe).pipe(
      catchError(this.handleError)
    )
  }


  //-------------------------------------------------------------------------------
  //----------------------------------Teilaufgaben---------------------------------
  //-------------------------------------------------------------------------------

  public getTeilAufgaben() {
    return  this.httpClient.get<TeilAufgabe[]>(`${this.api}Teilaufgaben`).pipe(retry(3), catchError(this.handleError));
  }
  public getTeilAufgabenByAufgabenId(aId: number) {
    return  this.httpClient.get<TeilAufgabe[]>(`${this.api}Teilaufgaben/GetTeilaufgabenByAufgabenId/${aId}`).pipe(retry(3), catchError(this.handleError));
  }
  //-------------------------------------------------------------------------------
  //----------------------------------Kommentare-----------------------------------
  //-------------------------------------------------------------------------------
  public getKommentare() {
    return this.httpClient.get<any>(`${this.api}Kommentar`).pipe(retry(3), catchError(this.handleError));
  }
  public getKommentarByAufgabenId(aufgabenId: number):Observable<Kommentar> {
    return this.httpClient.get<Kommentar>(`${this.api}Kommentar/GetKommentarByAufgabenId/${aufgabenId}`).pipe(retry(3), catchError(this.handleError));
  }
  public getKommentareByNutzerId(nutzerId: number) {
    return this.httpClient.get<any>(`${this.api}Kommentar/GetKommentarByNutzerId/${nutzerId}`).pipe(retry(3), catchError(this.handleError));
  }
  public addKommentar(kom: Kommentar): Observable<Kommentar> {
    console.log(kom);
    return this.httpClient.post<Kommentar>(`${this.api}Kommentar`, kom)
      .pipe(
        catchError(this.handleError)
      )
  }
}


const httpOptions = {
  headers: new HttpHeaders({     
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'plain/text',
  })
};