import { Component, OnInit, Input } from '@angular/core';
import { Constants } from 'src/app/constants/api.consts';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-kweet',
  templateUrl: './kweet.component.html',
  styleUrls: ['./kweet.component.scss']
})
export class KweetComponent implements OnInit {
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
