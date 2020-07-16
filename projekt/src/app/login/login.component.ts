import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;
import{ Router } from '@angular/router';
import { Login } from '../shared/login';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { fadeInAnimation } from '../_animations/index'
import { ProjectServiceService } from '../shared/project-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation]
})

export class LoginComponent implements OnInit {

  nutzer: User;
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  laden: boolean;

  constructor(private formBuilder: FormBuilder,private router: Router, public authService: AuthService, private ps: ProjectServiceService) { }

  ngOnInit(): void {
    this.laden = false;
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
    console.log("checkdata");
    if(this.f.userid.value == this.nutzer.nutzername && this.f.password.value == this.nutzer.passwort) {
      //console.log(JSON.stringify("nutzer "+this.nutzer.nutzerId));
      if(this.nutzer.isAdmin == true)
        localStorage.setItem('admin', "true");
      localStorage.setItem('id', JSON.stringify(this.nutzer.nutzerId)); 
      sessionStorage.setItem('gruppe', this.nutzer.team )
      let datum = new Date();
      this.nutzer.letzteAnmeldung = datum.toLocaleDateString();
      this.ps.updateUser(this.nutzer).subscribe(u => this.nutzer = u);
      this.router.navigate([this.returnUrl]);
    }
  }

  async login() {
    this.laden = true;
    if (this.loginForm.invalid) {
      return;
  }
  else {    
    this.authService.getUserByNutzername(this.f.userid.value).subscribe((data: User) => {
      this.nutzer = data;
      //console.log(data);
    }, error => {
      console.log("error");
    });
  }
    if(this.f.userid.value || true ){          
      setTimeout(() => { this.checkData()  }, 2000);      
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', this.f.userid.value);
    }
    else{
      this.message = "Please check your userid and password"; 
    }
  }    

}
