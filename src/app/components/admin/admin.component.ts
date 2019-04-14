import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentUser: User;

  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
  }

  ngOnInit() {
  }

}
