import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
//import { trigger, transition,style, query, group, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'projekt';
  isAdmin: string; 
  gruppe: string;
  projektleiter: boolean;

  constructor() {
    this.isAdmin = localStorage.getItem('admin');
    this.gruppe = sessionStorage.getItem('gruppe');
    if(this.gruppe === "Nutzer") {
      this.projektleiter = false;
    }
    else this.projektleiter= true;
  }

 
  //prepareRoute(outlet: RouterOutlet) {
  //  return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  //}
}
