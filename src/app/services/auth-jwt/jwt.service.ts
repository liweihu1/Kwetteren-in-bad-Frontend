import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants/api.consts';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/Token';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private redirectUrl: string;
  
  constructor(private httpClient: HttpClient, private router: Router, private userService: UserService, private toastr: ToastrService) { }

  async login (username: string, password: string) {
    this.httpClient.post(Constants.API_URL + '/Auth/login', {username, password}).toPromise().then((res: Token) => {
      localStorage.setItem(Constants.TOKEN, res.token);
      localStorage.setItem(Constants.LOCAL_ID, res.id);
      localStorage.setItem(Constants.LOCAL_USERNAME, res.username);
      this.saveUser();

      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
      } else {
        this.router.navigate(['/home'])
      }
      this.redirectUrl = null;
    }).catch(error => {
      this.toastr.error("Make sure the username and password are correct!", "Login failed");
    });
  }

  saveUser() {
    this.userService.getUserWithId(localStorage.getItem(Constants.LOCAL_ID)).then((res: User) => {
      localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(res));
    });
  }

  logout() {
    localStorage.removeItem(Constants.TOKEN);
    localStorage.removeItem(Constants.LOCAL_ID);
    localStorage.removeItem(Constants.LOCAL_USERNAME);
    localStorage.removeItem(Constants.CURRENT_USER);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem(Constants.TOKEN) !==  null;
  }

  public getRedirectUrl(): string {
    return this.redirectUrl;
  }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getToken(): string {
    return localStorage.getItem(Constants.TOKEN);
  }
}