import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/api.consts';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  async getUserWithId(id: string): Promise<User> {
    let headers = new HttpHeaders().set("Authorization", localStorage.getItem(Constants.TOKEN));
    const result = await this.httpClient.get(Constants.API_URL + '/user/' + id, { headers: headers }).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  private getUserFromPromise(res: User): User {
    return res;
  }
}
