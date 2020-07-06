import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Projekt } from '../shared/projekt';
import { Aufgaben } from '../shared/aufgaben';
import { ProjectServiceService } from '../shared/project-service.service';


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

  constructor(private ps: ProjectServiceService) {
    this.projekt.projektOwnerId = parseInt(localStorage.getItem('id'));
    this.aufgaben = [];
    this.toAdd = 
      {
        aufgabenId: 1,
        beschreibung: 'beschreibung'
      }
  }

  @Output() submitproject = new EventEmitter<Projekt>();

  submitForm() {
    //console.log(this.projekt)
    if (this.ps.setProjekt(this.projekt).subscribe(pr => this.projektAdded = pr ))
      console.log(this.projektAdded + " angelegt");
  }

  ngOnInit(): void { 
  }

  addTag() { 
    console.log(this.toAdd);
    console.log('aufgaben: ' + this.aufgaben.length)
    this.aufgaben.push(this.toAdd);
    console.log('aufgaben: ' + this.aufgaben.length)

    return false;
  }

  removeTag(i: number) {
    this.projekt.aufgaben.splice(i,1);
    return false;
  }

}
 