import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';
import { Kweet } from 'src/app/models/Kweet';
import { KweetService } from 'src/app/services/kweet/kweet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  private kweets: Array<Kweet>

  constructor(private userService: UserService, private kweetService: KweetService) {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
      this.getKweetsForUser();
    } else {
      this.userService.getUserWithId(this.user.id).then(res => {
        console.log(res);
        this.user = res;
        this.getKweetsForUser();
      });
    }
   }

  ngOnInit() {
  }

  private getKweetsForUser() {
    this.kweetService.getKweetsForUser(this.user.id).then(res => {
      console.log(this.kweets);
      this.kweets = res;
    });
  } 
}
