import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ProjectServiceService } from './shared/project-service.service';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProfilComponent } from './profil/profil.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListProjectsComponent,
    ProjectDetailsComponent,
    RegisterUserComponent,
    LoginComponent,
    NewProjectComponent,
    ProfilComponent,
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuard, 
    ProjectServiceService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
