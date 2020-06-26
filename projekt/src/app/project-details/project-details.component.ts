import { Component, OnInit } from '@angular/core';

import { ProjectServiceService } from '../shared/project-service.service';
import { Projekt } from '../shared/projekt';
import { TeilAufgabe } from '../shared/teil-aufgabe';
import { Aufgaben } from '../shared/aufgaben';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projekt: Projekt;
  aufgaben: Aufgaben[];
  teilAufgaben: TeilAufgabe[];

  constructor(private ps: ProjectServiceService) { }

  ngOnInit(): void {
    this.ps.getProjectById(1).subscribe(p => this.projekt = p);      

    this.ps.getAufgaben().subscribe((data: any[]) =>{
      this.aufgaben = data;
     // getNutzerid(this.aufgaben);

    })

    this.ps.getTeilAufgaben().subscribe((data: any[]) =>{
      console.log(data);
      this.teilAufgaben = data;
     // getNutzerid(this.aufgaben);

    })

  }

  addTime(time: string) {
    console.log(time);

  }

  isDone(id: number) {
    console.log(this.aufgaben[id -1]);
    this.aufgaben[id-1].erledigt = true;
    this.aufgaben[id-1].hasChanged = true;
  }

}
