import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServiceService } from '../shared/project-service.service';
import { Projekt } from '../shared/projekt';
import { TeilAufgabe } from '../shared/teil-aufgabe';
import { Aufgaben } from '../shared/aufgaben';
import { Observable } from 'rxjs';
import { fadeIn, fadeInAnimation} from '../_animations/index'


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  animations: [fadeInAnimation]
})
export class ProjectDetailsComponent implements OnInit {
  index: number;
  projekt: Projekt;
  aufgaben$: Observable<Aufgaben>;
  teilAufgaben: TeilAufgabe[];
  percent: number;
  add: boolean;
  neueAufgabe = new Aufgaben();

  constructor(private ps: ProjectServiceService, private router: Router,  private route: ActivatedRoute) { 
    this.add=false;
    this.neueAufgabe.erstellerId = parseInt(localStorage.getItem('id'));
    const params = this.route.snapshot.paramMap;
    this.neueAufgabe.projektId = parseInt(params.get('id'));
    this.neueAufgabe.erledigt = false;
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

/*     @Output() submitaufgabe = new EventEmitter<Aufgaben>();
 */

    this.ps.getProjectById(ident).subscribe(p => this.projekt = p);
    
    this.aufgaben$ = this.ps.getAufgabenByProjektId(ident);

  } 

  addTime(time: string) {
    console.log(time);  
  }

  isDone(id: number) {
    console.log(this.projekt.aufgaben[id -1]);
    this.projekt.aufgaben[id-1].erledigt = true;
    this.projekt.aufgaben[id-1].hasChanged = true;
  } 

  addTask() {
    console.log("neue");
    this.add = true
  } 

}
