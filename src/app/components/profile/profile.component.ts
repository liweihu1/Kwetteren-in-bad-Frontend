import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';
import { Kweet } from 'src/app/models/Kweet';
import { KweetService } from 'src/app/services/kweet/kweet.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user: User;
  isLoggedInUser = false;
  isFollowButton = true;
  kweets: Array<Kweet> = [];
  postFormGroup: FormGroup = new FormGroup({
    kweetMessage: new FormControl('')
  });

  constructor(private userService: UserService, private kweetService: KweetService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
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

  postMessage() {
    if (this.postFormGroup.get('kweetMessage').valid) {
      this.kweetService.postKweet(this.postFormGroup.get('kweetMessage').value, this.user.id).then(res => {
        if (res) {
          this.kweets.unshift(res);
          this.checkForTooManyKweets();
        }  
      });
    } else {
      this.toastr.error("The message can't be empty and should be shorter than 140 characters!");
    }
  }

  userIsLoggedIn(): boolean {
    return (JSON.parse(localStorage.getItem(Constants.CURRENT_USER)));
  }

  followUser() {
    this.userService.followUserWithUsername((JSON.parse(localStorage.getItem(Constants.CURRENT_USER))).id, this.user.username).then(res => {
      localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(res));
      this.checkIfCurrentUserIsFollowing();
    }).catch(() => {
      this.toastr.error("Something went wrong while following!");
    });
  }

  unfollowUser() {
    // TODO
  }

  checkIfCurrentUserIsFollowing() {
    const res = JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).following;
    console.log(res);
    if (res.includes(this.user.username)) {
      this.isFollowButton = false;
    }
  }

  goToUser(username: string) {
    this.router.navigate(["/profile/" + username])
  }

  private checkForTooManyKweets() {
    if (this.kweets.length > 10) {
      this.kweets.pop();
    }
  }

  private getUserByUsername(username: string) {
    this.userService.getUserWithUsername(username).then(res => {
      this.user = res;
      this.checkLoggedInUser(username);
      this.getKweetsForUser();
      this.checkIfCurrentUserIsFollowing();
    }).catch(err => {
      this.toastr.error(err, "Something went wrong while retrieving the user.");
    }); 
  }

  private getKweetsForUser() {
    this.kweetService.getKweetsForUser(this.user.id).then(res => {
      this.kweets = res;
    });
  }

  private checkLoggedInUser(username: string) {
    if (JSON.parse(localStorage.getItem(Constants.CURRENT_USER))) {
      this.isLoggedInUser = JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).username === username;
    }
    return false;
  }
}
