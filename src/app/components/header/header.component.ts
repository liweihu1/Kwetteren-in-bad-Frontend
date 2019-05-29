import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { JwtService } from 'src/app/services/auth-jwt/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Kwetteren In Bad';
  status: boolean = false;

  constructor(protected jwtService: JwtService, private eRef: ElementRef){
    
  }

  ngOnInit(): void {
    
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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.changeStatus;
    }
  }

  focusOut(): void {
    this.status = false;
  }

  logout(): void {
    this.jwtService.logout();
  }
}
