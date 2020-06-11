import { Component, OnInit } from '@angular/core';

import { ProjectServiceService } from '../shared/project-service.service';
import { Projekt } from '../shared/projekt';



@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projekt: Projekt;

  constructor(private ps: ProjectServiceService) { }

  ngOnInit(): void {
    this.ps.getProjectById(1).subscribe(p => this.projekt = p);  
  }

}
