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
  //aufgaben: Aufgaben[];
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
  hideTasks = true; 

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.isLoggedIn = localStorage.getItem('isLoggedIn');    
    this.authService.checkLogin(this.isLoggedIn);

  
    //hole projekt. in for schleife für jedes projekt die aufgaben in das projekt.aufgaben laden. 
    //
    this.ps.getProjectsByOwner(1).subscribe((data: any[]) => {
      this.projects = data; 
      for(let item of this.projects) {      
        this.numbers.push(item.projektId);
      }
      console.log(this.numbers);
    })

    //Aufgaben werden in das Array projekt.aufgaben kopiert
    this.ps.getAufgaben().subscribe((data: any[]) =>{
      this.projects[0].aufgaben = data;
      console.log("Aufgaben: "+ data.length);
    })

    this.ps.getNutzerAufgaben().subscribe((data: NutzerAufgaben[]) =>{
      this.nutzerAufgaben = data;
      //getNutzerid(this.nutzerAufgaben);
    })
  }

  zuProjekt(id: number): void {
    console.log("zu Projekt "+ id);
    this.router.navigate(['/project/'+id]);
  };

  zuAufgabe(id: number):void {
    console.log("zu Aufgabe "+ id);
  }

  show(id: number) {
    console.log("project " + id  +" / " + this.numbers[id-1]);
    this.hideTasks = !this.hideTasks;
  }

    logout(): void {
      console.log("Logout");
      this.authService.logout();
      this.router.navigate(['/login']);
    };   
  }