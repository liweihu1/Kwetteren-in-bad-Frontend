import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from 'src/app/constants/api.consts';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.jwtService.loggedIn && !this.jwtHelper.isTokenExpired(localStorage.getItem(Constants.TOKEN))) { 
        return true;
    }

    // Store the attempted URL for redirecting
    this.jwtService.setRedirectUrl(url);

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}