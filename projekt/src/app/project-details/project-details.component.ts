import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../shared/project-service.service';
import { Projekt } from '../shared/projekt';
import { TeilAufgabe } from '../shared/teil-aufgabe';
import { Aufgaben } from '../shared/aufgaben';
import { Observable } from 'rxjs';
import { fadeIn, fadeInAnimation} from '../_animations/index'
import {  User } from '../shared/user';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  animations: [fadeInAnimation]
})
export class ProjectDetailsComponent implements OnInit {
  index: number;
  projekt: Projekt;
  aufgaben$: Observable<Aufgaben>[];
  tasks: Aufgaben[];
  teilAufgaben: TeilAufgabe[];
  percent: number;
  add: boolean;
  neueAufgabe = new Aufgaben();
  user: User[];
  name: string;


  constructor(private ps: ProjectServiceService, private router: Router,  private route: ActivatedRoute) { 
    this.add=false;
    this.neueAufgabe.erstellerId = parseInt(localStorage.getItem('id'));
    const params = this.route.snapshot.paramMap;
    this.neueAufgabe.projektId = parseInt(params.get('id'));
    this.neueAufgabe.erledigt = false; 
    this.ps.getUser().subscribe((data: User[]) => { this.user = data})
  
  }

  submitForm() {
    this.ps.addAufgabe(this.neueAufgabe)
      .subscribe(pr => this.neueAufgabe)
      console.log(this.neueAufgabe.aufgabenId + "angelegt");
      setTimeout(() => { this.router.navigate(['home']);  }, 200);
    }

  ngOnInit(): void {    
    const params = this.route.snapshot.paramMap;
    console.log(params.get('id'))
    const ident = parseInt(params.get('id'));
    this.ps.getProjectById(ident).subscribe(p => this.projekt = p);    
    //this.aufgaben$ = this.ps.getAufgabenByProjektId(ident);
    this.ps.getAufgabenByProjektId(ident).subscribe(t => this.tasks = t);        
  } 


  addTask() {
    this.add = true
  } 

  changeUser(user: number){
    console.log(user);
    this.neueAufgabe.erstellerId = user;
  }

  saveProject() {
    // Funktion prüft, wenn projekt abgeschlossen werden soll, ob alle aufgaben erledigt sind.
    // Falls ja -> abschließen 
    // sonst fehler
    this.ps.getAufgabenByProjektId(this.projekt.projektId).subscribe(a => this.tasks = a);
    var allDone = true;
    console.log("projekt.erledig= "+this.projekt.erledigt)
    if(this.projekt.erledigt != 0) {                                                                          
      this.ps.updateProjekt(this.projekt).subscribe(p => this.projekt = p);
      return
    } else {
      for(let a of this.tasks) {
        if(a.erledigt == false) {
          allDone = false;
      } 
    } if(allDone) {
      this.ps.updateProjekt(this.projekt).subscribe(p => this.projekt = p);
      } else {
        alert("Nicht alle Aufgaben erledig!");
      }
    }
  }

  changeState($event: any){
    console.log($event.target.value);
    this.projekt.erledigt = parseInt($event.target.value);
  }

  changeOwn($event: any){
    console.log($event.target.value);
    this.projekt.projektOwnerId = parseInt($event.target.value);
  }

  print(){
    console.log(this.neueAufgabe.deadline)
  }

}
