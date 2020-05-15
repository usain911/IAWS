import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user'
import { ProjectServiceService } from '../shared/project-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private ps: ProjectServiceService) { }

  ngOnInit(): void {
    this.user = this.ps.getAll(); 
  }

}
