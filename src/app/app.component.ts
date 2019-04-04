import { Component } from '@angular/core';
import { JwtService } from './services/auth-jwt/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kwetteren In Bad';
  status: boolean = false;

  constructor(protected jwtService: JwtService){

  }

  public get currentUser(): boolean {
    return true;
  }

  getLoggedIn(): boolean {
    return this.jwtService.loggedIn;
  }

  changeStatus(): void {
    this.status = !this.status;
  }

  focusOut(): void {
    this.status = false;
  }

  logout(): void {
    this.jwtService.logout();
  }
}
