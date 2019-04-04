import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';
import { Kweet } from 'src/app/models/Kweet';
import { KweetService } from 'src/app/services/kweet/kweet.service';
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

  userIsLoggedIn(): boolean {
    return (JSON.parse(localStorage.getItem(Constants.CURRENT_USER)));
  }

  followUser() {
    this.userService.followUserWithUsername((JSON.parse(localStorage.getItem(Constants.CURRENT_USER))).id, this.user.username).then(res => {
      this.userService.getUserWithUsername(this.user.username).then(updatedUser => {
        this.user = updatedUser;
      });
      localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(res));
      this.checkIfCurrentUserIsFollowing();
    }).catch(() => {
      this.toastr.error("Something went wrong while following!");
    });
  }

  unfollowUser() {
    this.userService.unfollowUserWithUsername((JSON.parse(localStorage.getItem(Constants.CURRENT_USER))).id, this.user.username).then(res => {
      this.userService.getUserWithUsername(this.user.username).then(updatedUser => {
        this.user = updatedUser;
      });
      localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(res));
      this.checkIfCurrentUserIsFollowing();
    }).catch(() => {
      this.toastr.error("Something went wrong while unfollowing!");
    });
  }

  goToUser(username: string) {
    this.router.navigate(["/profile/" + username])
  }

  refreshData(user: User) {
    console.log(user);
    if (user.username === (JSON.parse(localStorage.getItem(Constants.CURRENT_USER))).username) {
      this.getUserByUsername(user.username);
    } else {
      localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(user));
      this.router.navigate(["/profile/" + user.username])
    }
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
