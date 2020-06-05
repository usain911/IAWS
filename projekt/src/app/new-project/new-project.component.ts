import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Projekt } from '../shared/projekt';


@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  project: Projekt;

  @Output() submitproject = new EventEmitter<Projekt>();

  submitForm() {
    console.log(this.project)
  }

  ngOnInit(): void { 
  }

}
