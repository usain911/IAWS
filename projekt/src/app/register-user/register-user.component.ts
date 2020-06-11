import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user';
import { NewUser } from '../shared/new-user';
import { EventEmitter } from 'events';
import { ProjectServiceService } from '../shared/project-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { fadeInAnimation } from '../_animations/index'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  animations: [fadeInAnimation]
})
export class RegisterUserComponent implements OnInit {


  constructor(private ps: ProjectServiceService, private router: Router, private as: AuthService) { } 

  teams = [];

  //user = new User(null, '', '','', '','', false, '',);
  user = new NewUser('','','','','', 0 );
  submitted = false;

  onSubmit() {this.submitted = true;}

  newUser() {
    console.log("neuer nutzer: "+ this.user.nutzername + this.user.email + this.user.passwort );
    this.as.addUser(this.user).subscribe(NewUser => console.log("done"))
  }

  ngOnInit(): void {
    this.ps.getTeams().subscribe((
      data: any[]) =>{
        this.teams = data;
        console.log(data)
      })
  } 

}
