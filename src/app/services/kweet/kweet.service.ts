import { Injectable } from '@angular/core';
import { Kweet } from 'src/app/models/Kweet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/api.consts';

@Injectable({
  providedIn: 'root'
})
export class KweetService {

  constructor(private httpClient: HttpClient) { }

  async getKweetsForUser(userId: string, page: number): Promise<Array<Kweet>> {
    const result = await this.httpClient.get('/kwetter/' + Constants.API_URL + '/kweets/user/' + userId + '/' + page).toPromise().then(this.getKweetsFromPromise).catch(error => {
      throw error;
    });
    return result;
  }

  async findKweetsWithSearch(search: string, page: number): Promise<Array<Kweet>> {
    const result = await this.httpClient.get('/kwetter/' + Constants.API_URL + '/kweets/search/' + search + '/' + page).toPromise().then(this.getKweetsFromPromise).catch(error => {
      throw error;
    });
    return result;
  }

  async postKweet(message: string, authorId: string): Promise<Kweet> {
    const body = {message: message, author: {id: authorId}};
    const result = await this.httpClient.post('/kwetter/' + Constants.API_URL + '/kweets/create', body, this.setBearerToken()).toPromise().then(this.getKweetFromPromise).catch(error => {
      throw error;
    });
    return result;
  }

  async getKweetsForUserWithFollowing(userId: string, page: number): Promise<Array<Kweet>> {
    const result = await this.httpClient.get('/kwetter/' + Constants.API_URL + '/kweets/user/follow/' + userId + '/' + page, this.setBearerToken()).toPromise().then(this.getKweetsFromPromise).catch(error => {
      throw error;
    });
    return result;
  } 

  async getAllKweets(pageNumber: number): Promise<Array<Kweet>> {
    const result = await this.httpClient.get('/kwetter/' + Constants.API_URL + '/kweets/page/' + pageNumber).toPromise().then(this.getKweetsFromPromise).catch(error => {
      throw error;
    });
    return result;
  }

  async deleteKweet(authorId: string, kweetId: string) {
    const result = await this.httpClient.delete(`/kwetter/${Constants.API_URL}/kweets/${authorId}/${kweetId}`, this.setBearerToken()).toPromise().then().catch(error => {throw error;});
    return result;
  }

  private setBearerToken() {
    const headers = new HttpHeaders().set("Authorization", localStorage.getItem(Constants.TOKEN));
    return {headers: headers};
  }

  private getKweetsFromPromise(res): Array<Kweet> {
    return res;
  }

  private getKweetFromPromise(res): Kweet {
    return res;
  }
}
