import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';
import { Kweet } from 'src/app/models/Kweet';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  isLoggedInUser = false;
  isFollowButton = true;
  kweets: Array<Kweet> = [];

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (!params['username']) {
        this.getUserByUsername(JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).username);
      } else {
        this.getUserByUsername(params['username']);
      }
    });
  }

  ngOnInit() {
  }

  goToUser(username: string) {
    this.router.navigate(["/profile/" + username])
  }

  refreshData(newUser: User) {
    if (newUser.username === (JSON.parse(localStorage.getItem(Constants.CURRENT_USER))).username) {
      this.getUserByUsername(newUser.username);
    } else {
      localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(newUser));
      this.router.navigate(["/profile/" + newUser.username])
    }
  }

  refreshNonCurrentUserDate(newUser: User) {
    this.user = newUser;
  }

  private getUserByUsername(username: string) {
    this.userService.getUserWithUsername(username).then(res => {
      this.user = res;
      this.checkLoggedInUser(username);
      this.checkIfCurrentUserIsFollowing();
    }).catch(err => {
      this.toastr.error(err, "Something went wrong while retrieving the user.");
    }); 
  }
  
  private checkIfCurrentUserIsFollowing() {
    const res = JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).following;
    if (res.includes(this.user.username)) {
      this.isFollowButton = false;
    } else {
      this.isFollowButton = true;
    }
  }

  private checkLoggedInUser(username: string) {
    if (JSON.parse(localStorage.getItem(Constants.CURRENT_USER))) {
      this.isLoggedInUser = JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).username === username;
    }
    return false;
  }
}
