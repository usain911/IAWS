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
  numbers = new Array();
  showTasks = false; 


  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.isLoggedIn = localStorage.getItem('isLoggedIn');    
    this.authService.checkLogin(this.isLoggedIn);

    this.ps.getLocalUser().subscribe((data: any[]) =>{
      //console.log(data);
      this.users = data;
    })

    this.ps.getProjectsByOwner(1).subscribe((data: any[]) => {
      this.projects = data;
      //console.log("Projekte "+data);   
      for(let item of this.projects) {      
        this.numbers.push(item.projektId);
      }
      console.log(this.numbers);
    })

    this.ps.getAufgaben().subscribe((data: any[]) =>{
      this.aufgaben = data;        
    })

    this.ps.getNutzerAufgaben().subscribe((data: NutzerAufgaben[]) =>{
      this.nutzerAufgaben = data;
      //getNutzerid(this.nutzerAufgaben);
    })

   /*  function getNutzerid(items: NutzerAufgaben[]) {
      for(let entry of items) {
        console.log(entry.nutzerId);
        this.ps.get  (entry.nutzerId).subscribe((data: User[]) =>{
          this.user = data;
        })        
      }
      console.log(this.user);      
    } */
  }

  zuProjekt(id: number): void {
    console.log("zu Projekt "+ id);
    this.router.navigate(['/project/id']);
  };

  zuAufgabe(id: number):void {
    console.log("zu Aufgabe "+ id);
  }

  isDone(id: number) {
    console.log(this.aufgaben[id -1]);
    this.aufgaben[id-1].erledigt = true;
    this.aufgaben[id-1].hasChanged = true;
  }

  show(id: number) {
    console.log("project " + id  +" / " + this.numbers[id-1]);
    this.showTasks = !this.showTasks;
  }

    logout(): void {
      console.log("Logout");
      this.authService.logout();
      this.router.navigate(['/login']);
    };

    

}
