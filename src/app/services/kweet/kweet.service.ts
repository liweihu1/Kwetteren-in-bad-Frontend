import { Injectable } from '@angular/core';
import { Kweet } from 'src/app/models/Kweet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/constants/api.consts';

@Injectable({
  providedIn: 'root'
})
export class KweetService {

  constructor(private httpClient: HttpClient) { }

  async getKweetsForUser(userId: string): Promise<Array<Kweet>> {
    let headers = new HttpHeaders().set("Authorization", localStorage.getItem(Constants.TOKEN));
    console.log(localStorage.getItem(Constants.TOKEN))
    console.log(headers);
    const result = await this.httpClient.get(Constants.API_URL + '/kweet/user/' + userId, { headers: headers }).toPromise().then(this.getKweetsFromPromise);
    console.log(result);
    return result;
  }

  private getKweetsFromPromise(res): Array<Kweet> {
    return res;
  }
}
