import { Component, OnInit } from '@angular/core';
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

  constructor(private ps: ProjectServiceService, private router: Router,  private route: ActivatedRoute) { 

    
  }



  ngOnInit(): void {    

    const params = this.route.snapshot.paramMap;
    console.log(params.get('id'))
    const ident = parseInt(params.get('id'));

    this.ps.getProjectById(ident).subscribe(p => this.projekt = p);
    
    this.aufgaben$ = this.ps.getAufgaben();

    this.ps.getAufgaben().subscribe((data: Aufgaben[]) =>{
      this.projekt.aufgaben = data; 
      this.projekt.size = data.length;  
      var isDone = 0;
      for(let a of data) {
        if(a.erledigt === true) {
          isDone +=1;
        }
      }  
      this.projekt.tasksDone = isDone; 
      this.percent= isDone/this.projekt.size * 100; 
    })
  }

  addTime(time: string) {
    console.log(time);  

  }

  isDone(id: number) {
    console.log(this.projekt.aufgaben[id -1]);
    this.projekt.aufgaben[id-1].erledigt = true;
    this.projekt.aufgaben[id-1].hasChanged = true;
  }

}
