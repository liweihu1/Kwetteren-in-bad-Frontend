import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, } from '@angular/core';
import { KweetService } from 'src/app/services/kweet/kweet.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Kweet } from 'src/app/models/Kweet';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/constants/api.consts';

@Component({
  selector: 'app-kweet-overview-card',
  templateUrl: './kweet-overview-card.component.html',
  styleUrls: ['./kweet-overview-card.component.scss']
})
export class KweetOverviewCardComponent implements OnInit, OnChanges {
  @ViewChild('message') messageArea: ElementRef;

  @Input() isLoggedInUser: boolean;
  @Input() shouldShowAllKweets: boolean;
  @Input() user: User;

  private pageNumber = 0;
  
  noMoreKweets = false;
  kweets: Array<Kweet>;

  postFormGroup: FormGroup = new FormGroup({
    kweetMessage: new FormControl('')
  });

  constructor(private kweetService: KweetService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getKweetsForUser();
  }

  ngOnChanges() {
    this.getKweetsForUser();
  }

  postMessage() {
    if (this.postFormGroup.get('kweetMessage').valid) {
      this.kweetService.postKweet(this.postFormGroup.get('kweetMessage').value, this.user.id).then(res => {
        if (res) {
          this.kweets.unshift(res);
          this.messageArea.nativeElement.value = '';
        }  
      });
    } else {
      this.toastr.error("The message can't be empty and should be shorter than 140 characters!");
    }
  }

  deleteKweet(kweet: Kweet) {
    this.kweetService.deleteKweet((JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).id), kweet.id).then(() => {
      this.getKweetsForUser();
    }).catch(() => {
      this.toastr.error("Something went wrong while deleting the kweet. Try again later.");
    });
  }

  getNewKweets() {
    this.pageNumber++;
    if (!this.shouldShowAllKweets) {
      this.kweetService.getKweetsForUser(this.user.id, this.pageNumber).then(res => {
        this.checkForNoMoreKweets(res);
      });
    } else if (this.shouldShowAllKweets && this.user) {
      this.kweetService.getKweetsForUserWithFollowing(this.user.id, this.pageNumber).then(res => {
        this.checkForNoMoreKweets(res);
      });
    } else {
      this.kweetService.getAllKweets(this.pageNumber).then(res => {
        this.checkForNoMoreKweets(res);
      });
    }
  }

  private checkForNoMoreKweets(res: Array<Kweet>) {
    if (res.length === 0) {
      this.noMoreKweets = true;
    } else if (res.length > 0 &&  res.length < 10) {
      this.kweets = this.kweets.concat(res);
      this.noMoreKweets = true;
    } else {
      this.kweets = this.kweets.concat(res);
    }
  }

  private getKweetsForUser() {
    if (!this.shouldShowAllKweets) {
      this.kweetService.getKweetsForUser(this.user.id, this.pageNumber).then(res => {
        this.kweets = res;
      });
    } else if (this.shouldShowAllKweets && this.user) {
      this.kweetService.getKweetsForUserWithFollowing(this.user.id, this.pageNumber).then(res => {
        this.kweets = res;
      });
    } else {
      this.kweetService.getAllKweets(this.pageNumber).then(res => {
        this.kweets = res;
      });
    }
    this.checkCurrentKweets();
  }

  private checkCurrentKweets() {
    if (this.kweets.length > 0 && this.kweets.length < 10) {
      this.noMoreKweets = true;
    }
  }
}
