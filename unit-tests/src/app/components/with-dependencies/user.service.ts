import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {

  user: User;
  isLoggedIn: boolean;

  login(user: User) {
    this.user = user;
    this.isLoggedIn = true;
  }

  logout() {
    this.user = undefined;
    this.isLoggedIn = false;
  }

}
