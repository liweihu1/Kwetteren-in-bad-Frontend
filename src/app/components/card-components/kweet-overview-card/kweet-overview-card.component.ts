import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, } from '@angular/core';
import { KweetService } from 'src/app/services/kweet/kweet.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Kweet } from 'src/app/models/Kweet';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kweet-overview-card',
  templateUrl: './kweet-overview-card.component.html',
  styleUrls: ['./kweet-overview-card.component.scss']
})
export class KweetOverviewCardComponent implements OnInit, OnChanges {
  @ViewChild('message') messageArea: ElementRef;

  @Input() isLoggedInUser: boolean;
  @Input() user: User;
  
  kweets: Array<Kweet>;

  postFormGroup: FormGroup = new FormGroup({
    kweetMessage: new FormControl('')
  });

  constructor(private kweetService: KweetService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getKweetsForUser();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getKweetsForUser();
  }

  postMessage() {
    if (this.postFormGroup.get('kweetMessage').valid) {
      this.kweetService.postKweet(this.postFormGroup.get('kweetMessage').value, this.user.id).then(res => {
        if (res) {
          this.kweets.unshift(res);
          this.checkForTooManyKweets();
          this.messageArea.nativeElement.value = '';
        }  
      });
    } else {
      this.toastr.error("The message can't be empty and should be shorter than 140 characters!");
    }
  }

  private checkForTooManyKweets() {
    if (this.kweets.length > 10) {
      this.kweets.pop();
    }
  }

  private getKweetsForUser() {
    this.kweetService.getKweetsForUser(this.user.id).then(res => {
      this.kweets = res;
    });
  }
}
