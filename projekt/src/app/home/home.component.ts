import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user'
import { ProjectServiceService } from '../shared/project-service.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Projekt } from '../shared/projekt';
import { Aufgaben } from '../shared/aufgaben'

import { trigger, transition,style, query, group, animate, state} from '@angular/animations';

import { NutzerAufgaben} from '../shared/nutzer-aufgaben';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity:0}),
        animate('300ms', style({ opacity:1 }))
      ])

    ])
  ]
})

export class HomeComponent implements OnInit {
  
  users: User[];
  luser: User[];
  nutzer: User;
  projects: Projekt[];
  aufgaben: Aufgaben[];
  nutzerAufgaben: NutzerAufgaben[];

  id: string;
  isLoggedIn: string;

  public color: string;
    onKeyUp() {
      console.log('keyup ' + this.color)
    }
  constructor(private ps: ProjectServiceService, private router: Router,public authService: AuthService) { 
    
  } 

  user: User[];
  test: User;
  zahl= 75;
  array: number[];

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.isLoggedIn = localStorage.getItem('isLoggedIn');    
    this.authService.checkLogin(this.isLoggedIn);

    this.ps.getLocalUser().subscribe((data: any[]) =>{
      //console.log(data);
      this.users = data;
    })

    this.ps.getProjectsByOwner(1).subscribe((data: any[]) =>{
      this.projects = data;
      //console.log("Projekte "+data);
    })

    this.ps.getAufgaben().subscribe((data: any[]) =>{
      this.aufgaben = data;
     // getNutzerid(this.aufgaben);

    })

    this.ps.getNutzerAufgaben().subscribe((data: NutzerAufgaben[]) =>{
      this.nutzerAufgaben = data;
      getNutzerid(this.nutzerAufgaben);
    })

    function getNutzerid(items: NutzerAufgaben[]) {
      for(let entry of items) {
        console.log(entry.nutzerId);
        this.ps.get  (entry.nutzerId).subscribe((data: User[]) =>{
          this.user = data;
        })        
      }
      console.log(this.user);      
    }
  }

    logout(): void {
      console.log("Logout");
      this.authService.logout();
      this.router.navigate(['/login']);
    };

    

}
