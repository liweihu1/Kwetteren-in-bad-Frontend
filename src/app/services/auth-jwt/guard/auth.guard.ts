import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.jwtService.loggedIn) { 
        return true;
    }

    // Store the attempted URL for redirecting
    this.jwtService.setRedirectUrl(url);

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}