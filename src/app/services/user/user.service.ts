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
    const result = await this.httpClient.get(Constants.API_URL + '/user/byId/' + id).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  async getUserWithUsername(username: string): Promise<User> {
    const result = await this.httpClient.get(Constants.API_URL + '/user/' + username).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  async followUserWithUsername(currentUserId: string, userToFollowUsername: string) {
    const body = {userId: currentUserId, username: userToFollowUsername};
    const result = await this.httpClient.post(Constants.API_URL + '/user/follow', body, this.setBearerToken()).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  async updateUser(userId: string, newValues) {
    const body = {id: userId, username: newValues.username, firstName: newValues.firstName, lastName: newValues.lastName, biography: newValues.biography, website: newValues.website, location: newValues.location};
    const result = await this.httpClient.put(Constants.API_URL + '/user/update', body, this.setBearerToken()).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  private getUserFromPromise(res: User): User {
    return res;
  }

  private setBearerToken() {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem(Constants.TOKEN));
    return {headers: headers};
  }
}
