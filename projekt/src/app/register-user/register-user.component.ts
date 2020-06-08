import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user';
import { EventEmitter } from 'events';
import { ProjectServiceService } from '../shared/project-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private ps: ProjectServiceService, private router: Router) { } 

  teams = [];

  

  user = new User( 0, '', '','', '','', false, '',);
  
  submitted = false;

  onSubmit() {this.submitted = true;}

  newUser() {
    console.log("neuer nutzer: "+ this.user.nutzername + this.user.email + this.user.passwort + " " +this.user.team);
  }

  ngOnInit(): void {
    this.ps.getTeams().subscribe((
      data: any[]) =>{
        this.teams = data;
        console.log(data)
      })
  }
 

}
