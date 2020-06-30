import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  teilAufgaben: TeilAufgabe[];
  percent: number;

  constructor(private ps: ProjectServiceService, private router: Router,  private route: ActivatedRoute) { 

    
  }



  ngOnInit(): void {    

    const params = this.route.snapshot.paramMap;
    console.log(params.get('id'))
    const ident = parseInt(params.get('id'));

    this.ps.getProjectById(ident).subscribe(p => this.projekt = p);      

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

    //this.ps.getTeilAufgaben().subscribe((data: any[]) =>{
    //  console.log(data);
    //  this.teilAufgaben = data;
     // getNutzerid(this.aufgaben);

    //})

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
