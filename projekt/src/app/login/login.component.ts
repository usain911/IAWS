import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;
import{ Router } from '@angular/router';
import { Login } from '../shared/login';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  nutzer: User;
  model: Login = { userid: "admin", password: "admin123" };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/home';
    this.authService.logout();
  }  

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  checkData() {
    if(this.f.userid.value == this.nutzer.name) {
      console.log(JSON.stringify("nutzer "+this.nutzer.name));
      this.router.navigate([this.returnUrl]);
    }
  }

  async login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }
  else {    
    this.authService.getUserByLogin().subscribe((data: User) => {
      this.nutzer = data;
      console.log("name "+this.nutzer.name)
    }, error => {
      console.log("error");
    });
  }

    if(this.f.userid.value == this.model.userid && this.f.password.value == this.model.password){      
      //let nutzer = this.authService.getUser();      
      setTimeout(() => { this.checkData()  }, 2000);
      console.log("Login successful ");
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', this.f.userid.value);
    }
    else{
      this.message = "Please check your userid and password";
    }
  }    
  
  

}
