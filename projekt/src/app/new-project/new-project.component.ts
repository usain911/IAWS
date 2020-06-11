import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Projekt } from '../shared/projekt';
import { Aufgaben } from '../shared/aufgaben';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  projekt = new Projekt();
  aufgaben: Aufgaben[];
  public toAdd: Aufgaben;

  constructor() {
    this.aufgaben = [];
    this.toAdd = 
      {
        aufgabenId: 1,
      }
  }

  @Output() submitproject = new EventEmitter<Projekt>();

  submitForm() {
    console.log(this.projekt)
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
 