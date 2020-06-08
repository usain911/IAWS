import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanNavigate } from './can-navigate.guard'

import { HomeComponent } from './home/home.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NewProjectComponent } from './new-project/new-project.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[CanNavigate] },
  { path: 'list', component: ListProjectsComponent, canActivate:[CanNavigate] },
  { path: 'project', component: ProjectDetailsComponent, canActivate:[CanNavigate] },
  { path: 'register', component: RegisterUserComponent },
  { path: 'newproject', component: NewProjectComponent, canActivate:[CanNavigate] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
