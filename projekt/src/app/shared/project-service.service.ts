import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  user: User;
  constructor() { 
    this.user = new User(1, 'Max', 'Mustermann', '123');
  }

  getAll() {
    return this.user;
  }
}


