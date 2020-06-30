import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanNavigate } from './can-navigate.guard'

import { HomeComponent } from './home/home.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
const routes: Routes = [
  { path: '', component: LoginComponent, data: {animation: 'one'} },
  { path: 'home', component: HomeComponent, canActivate:[CanNavigate] },
  { path: 'list', component: ListProjectsComponent, canActivate:[CanNavigate] },
  { path: 'project/:id', component: ProjectDetailsComponent, canActivate:[CanNavigate] },
  { path: 'register', component: RegisterUserComponent },
  { path: 'newproject', component: NewProjectComponent, },
  { path: 'profil', component: ProfilComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
