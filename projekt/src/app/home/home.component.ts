import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user'
import { ProjectServiceService } from '../shared/project-service.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Projekt } from '../shared/projekt';
import { Aufgaben } from '../shared/aufgaben'
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, filter } from 'rxjs/operators';

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

  keyUp$ = new Subject<string>();
  isLoading = false;
  foundProjects: Projekt[] = [];

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

  array: number[];
  numbers = new Array();
  hideTasks = true; 

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.isLoggedIn = localStorage.getItem('isLoggedIn');    
    this.authService.checkLogin(this.isLoggedIn);

    this.keyUp$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.ps.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    )
    .subscribe(projekte => this.foundProjects = projekte);
  

  
    //hole projekt. in for schleife für jedes projekt die aufgaben in das projekt.aufgaben laden. 
    //
    this.ps.getProjectsByOwner(2).subscribe((data: any[]) => {
      this.projects = data; 
      for(let item of this.projects) {      
        this.numbers.push(item.projektId);
      }
      console.log(this.numbers);
    })

    //Aufgaben werden in das Array projekt.aufgaben kopiert
    this.ps.getAufgaben().subscribe((data: any[]) =>{
      this.aufgaben = data;
      console.log("Aufgaben: "+ data.length);
    })

    this.ps.getNutzerAufgaben().subscribe((data: NutzerAufgaben[]) =>{
      this.nutzerAufgaben = data;
      //getNutzerid(this.nutzerAufgaben);
    })
  }

  zuProjekt(id: number): void {
    console.log("zu Projekt "+ id);
    setTimeout(() => { this.router.navigate(['/project/'+id]);  }, 500);
    //this.router.navigate(['/project/'+id]);
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