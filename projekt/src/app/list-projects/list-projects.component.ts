import { Component, OnInit} from '@angular/core';
import { fadeIn, fadeInAnimation} from '../_animations/index'
import { Projekt } from '../shared/projekt';
import { User } from '../shared/user';

import { ProjectServiceService } from '../shared/project-service.service';
import { Aufgaben } from '../shared/aufgaben';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css'],
  animations: [fadeInAnimation]
})
export class ListProjectsComponent implements OnInit {

  projekte: Projekt[];
  user: User[];
  aufgaben: Aufgaben[];



  constructor(private ps: ProjectServiceService) {  }  

  ngOnInit(): void {

    this.ps.getUser().subscribe((data: User[]) => { this.user = data;  })

    this.ps.getAufgaben().subscribe((data: Aufgaben[]) => { this.aufgaben = data;  })

    this.ps.getProjects().subscribe((data: Projekt[]) => {
      this.projekte = data;       
      this.userToProjekt();
    })

 

   
  }

  userToProjekt() {
    //console.log(this.projekte);
    //console.log(this.user); 
    for(var val of this.projekte) {
      console.log(val);
      for(var u of this.user) {
        //console.log(u);
        if(val.projektOwnerId === u.nutzerId) {
          val.user = u;
        }
      }
    }
    //console.log(this.projekte);
  }

}
