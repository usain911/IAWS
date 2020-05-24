import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user'
import { ProjectServiceService } from '../shared/project-service.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  
  users: User[];

  user: User;


  public color: string;
    onKeyUp() {
      console.log('keyup ' + this.color)
    }
  constructor(private ps: ProjectServiceService) { }

 

  ngOnInit(): void {

    this.ps.sendGetRequest().subscribe((data: any[]) =>{
      console.log(data);
      this.users = data;
    })

    this.user = this.ps.getAll(); 
  }

}
