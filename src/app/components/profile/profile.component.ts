import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService) {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
    } else {
      this.userService.getUserWithId(this.user.id).then(res => {
        this.user = res;
      });
    }
   }

  ngOnInit() {
  }

}
