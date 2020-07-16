import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Projekt } from '../shared/projekt';
import { Aufgaben } from '../shared/aufgaben';
import { ProjectServiceService } from '../shared/project-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  projekt = new Projekt();
  projektAdded: Projekt;
  aufgaben: Aufgaben[];
  public toAdd: Aufgaben;

  constructor(private ps: ProjectServiceService, private route: ActivatedRoute, private router: Router) {

    this.projekt.projektOwnerId = parseInt(localStorage.getItem('id'));
    this.projekt.erledigt = 2;
    this.aufgaben = [];
    this.toAdd = 
      {
        aufgabenId: 1,
        beschreibung: 'beschreibung'
      }
  }

  @Output() submitproject = new EventEmitter<Projekt>();

  submitForm() {
    this.ps.setProjekt(this.projekt)
      .subscribe(pr => this.projekt)
      console.log(this.projekt.projektId + "angelegt");
      setTimeout(() => { this.router.navigate(['home']);  }, 200);
    }      
  

  ngOnInit(): void { 
  }
}
 