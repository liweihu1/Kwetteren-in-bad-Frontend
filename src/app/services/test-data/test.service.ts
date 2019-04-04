import { Injectable } from '@angular/core';
import { Kweet, KweetInterface } from '../../models/Kweet';
import { User, UserInterface } from '../../models/User';
import { default as UserData } from '../../../assets/data/users.json';
import { default as KweetData } from '../../../assets/data/kweets.json';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  kweets: Array<Kweet> = [];
  users: Array<User> = [];

  constructor() {
    UserData.forEach(user => {
      const u : any = user;
      const tu : User = u as UserInterface;
      this.users.push(new User(tu));
    });

    KweetData.forEach(kweet => {
      const k : any= kweet;
      const tk : Kweet = k as KweetInterface;
      this.kweets.push(new Kweet(tk));
    });
  }

  getUserById(id: string) : User {
    return this.users.find(user => {
      return user.id == id;
    });
  }

  getKweetsForUser(id: string) : Array<Kweet> {
    return this.kweets.filter( kweet => kweet.author.id === id);
  }
}
