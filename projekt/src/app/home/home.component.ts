import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user'
import { ProjectServiceService } from '../shared/project-service.service';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Projekt } from '../shared/projekt';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  
  users: User[];
  luser: User[];
  nutzer: User;
  projects: Projekt[];

  id: string;
  isLoggedIn: string;

  public color: string;
    onKeyUp() {
      console.log('keyup ' + this.color)
    }
  constructor(private ps: ProjectServiceService, private router: Router,public authService: AuthService) { } 

  user: User;
  

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.isLoggedIn = localStorage.getItem('isLoggedIn');    
    this.authService.checkLogin(this.isLoggedIn);

    this.ps.sendGetRequest().subscribe((data: any[]) =>{
      console.log(data);
      this.users = data;
    })

    this.ps.getProjectsByOwner(1).subscribe((data: any[]) =>{
      this.projects = data;
    })

    this.ps.getRequest().subscribe((
      data: any[]) =>{
        this.luser = data;
        console.log(`live: ${data}`);
      })

    this.ps.getTeams().subscribe((
      data: any[]) =>{
        console.log(data)
      })
    
  }

    logout(): void {
      console.log("Logout");
      this.authService.logout();
      this.router.navigate(['/login']);
    };

    

}
