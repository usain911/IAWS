import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' ;
import{ Router } from '@angular/router';
import { Login } from '../shared/login';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { fadeInAnimation } from '../_animations/index'

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

  constructor(private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

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
    if(this.f.userid.value == this.nutzer.nutzername) {
      console.log(JSON.stringify("nutzer "+this.nutzer.nutzerId));
      if(this.nutzer.isAdmin == true)
        localStorage.setItem('admin', "true");
      localStorage.setItem('id', JSON.stringify(this.nutzer.nutzerId));
      this.router.navigate([this.returnUrl]);
    }
  }

  async login() {
    this.laden = true;
    console.log("lädt - " + this.laden);
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }
  else {    
    this.authService.getUserByNutzername(this.f.userid.value).subscribe((data: User) => {
    //  this.authService.getUserByLogin(1).subscribe((data: User) => {
      this.nutzer = data;
      //console.log("daten= "+data);
      //console.log(data);
      //console.log("nID= "+ this.nutzer.nutzerId +" eingabe="+ this.f.userid.value +" " + + " ")
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

  test() {
    this.laden = true;
    console.log("laden= " + this.laden);
  }
  
  

}
