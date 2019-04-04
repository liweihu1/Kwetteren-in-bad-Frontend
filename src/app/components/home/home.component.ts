import { Component, OnInit, Input } from '@angular/core';
import { TestService } from 'src/app/services/test-data/test.service';
import { User } from 'src/app/models/User';
import { Kweet } from 'src/app/models/Kweet';
import { UserService } from 'src/app/services/user/user.service';
import { KweetService } from 'src/app/services/kweet/kweet.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants/api.consts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedInUser = false;
  user: User;

  constructor(){
  }

  ngOnInit() {
    if (localStorage.getItem(Constants.CURRENT_USER)) {
      this.user = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
      this.isLoggedInUser = true;
    }
  }
}
