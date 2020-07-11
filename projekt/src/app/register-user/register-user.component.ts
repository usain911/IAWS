import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NewUser } from '../shared/new-user';
import { AuthService } from '../shared/auth.service';
import { fadeInAnimation } from '../_animations/index'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  animations: [fadeInAnimation]
})
export class RegisterUserComponent implements OnInit {


  constructor(
    private as: AuthService,
    private router: Router,
    private route: ActivatedRoute) { } 

  teams = [];

  user = new NewUser('anmeldename','vorname','nachname','email','', false );
  submitted = false;

  onSubmit() {this.submitted = true;}

  newUser() {
    console.log("neuer nutzer: "+ this.user);
    this.as.addUser(this.user).subscribe(NewUser => console.log("done"))
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  ngOnInit(): void {
   /*  this.ps.getTeams().subscribe((
      data: any[]) =>{
        this.teams = data;
        console.log(data)
      }) */
  } 

}
