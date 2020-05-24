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
import { HttpClientModule }    from '@angular/common/http';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListProjectsComponent,
    ProjectDetailsComponent,
    RegisterUserComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ ProjectServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
