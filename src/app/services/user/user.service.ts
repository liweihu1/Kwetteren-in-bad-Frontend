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
    const result = await this.httpClient.get('/kwetter/' + Constants.API_URL + '/users/' + id).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  async getUserWithUsername(username: string): Promise<User> {
    const result = await this.httpClient.get('/kwetter/' + Constants.API_URL + '/users/username/' + username).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  async followUserWithUsername(id: string, userToFollowUsername: string) {
    const body = {userId: id, username: userToFollowUsername};
    const result = await this.httpClient.post('/kwetter/' + Constants.API_URL + '/users/follow/' + id, body, this.setBearerToken()).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  async unfollowUserWithUsername(id: string, userToFollowUsername: string) {
    const body = {userId: id, username: userToFollowUsername};
    const result = await this.httpClient.post('/kwetter/' + Constants.API_URL + '/users/unfollow/' + id, body, this.setBearerToken()).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
    return result;
  }

  async updateUser(userId: string, newValues) {
    const body = {id: userId, username: newValues.username, firstName: newValues.firstName, lastName: newValues.lastName, biography: newValues.biography, website: newValues.website, location: newValues.location};
    const result = await this.httpClient.put('/kwetter/' + Constants.API_URL + '/users/', body, this.setBearerToken()).toPromise().then(this.getUserFromPromise).catch(error => { throw error; });
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
