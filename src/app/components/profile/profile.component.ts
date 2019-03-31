import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';
import { Kweet } from 'src/app/models/Kweet';
import { KweetService } from 'src/app/services/kweet/kweet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  private isLoggedInUser = false;
  private kweets: Array<Kweet>;

  constructor(private userService: UserService, private kweetService: KweetService, private toastr: ToastrService) {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
      this.isLoggedInUser = true;
      this.getKweetsForUser();
    } else {
      this.isLoggedInUser = false;
      this.getKweetsForUser();
    }
   }

  ngOnInit() {
  }

  async handleUserChanged(authorId) {
    let shouldRefresh = JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).id !== authorId;
    if (shouldRefresh) {
      this.userService.getUserWithId(authorId).then(res => {
        this.user = res;
        this.isLoggedInUser = shouldRefresh;
        this.getKweetsForUser();
      }).catch(error => {
        this.toastr.error(error, "Something went wrong while trying to get the user!");
      });
    }
  }

  private getKweetsForUser() {
    this.kweetService.getKweetsForUser(this.user.id).then(res => {
      console.log(this.kweets);
      this.kweets = res;
    });
  }
}
