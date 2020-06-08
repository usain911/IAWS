import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;
import{ Router } from '@angular/router';
import { Login } from '../shared/login';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  nutzer: User;
  model: Login = { nutzername: "admin", password: "admin123" };
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
    console.log("checkdata");
    if(this.f.userid.value == this.nutzer.nutzername) {
      console.log(JSON.stringify("nutzer "+this.nutzer.nutzername));
      this.router.navigate([this.returnUrl]);
    }
  }

  async login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }
  else {    
    this.authService.getUserByLogin(1).subscribe((data: User) => {
      this.nutzer = data;
      console.log("name "+ this.nutzer.nutzername)
    }, error => {
      console.log("error");
    });
  }
    if(this.f.userid.value == this.model.nutzername && this.f.password.value == this.model.password){          
      setTimeout(() => { this.checkData()  }, 2000);
      console.log("Login "+ this.model.nutzername);
      if(this.model.nutzername === "admin")
        localStorage.setItem('admin', "true");
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', this.f.userid.value);
    }
    else{
      this.message = "Please check your userid and password"; 
    }
  }    
  
  

}
