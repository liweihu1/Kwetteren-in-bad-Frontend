import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/constants/api.consts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentUser: string;

  constructor() { 
    this.currentUser = localStorage.getItem(Constants.LOCAL_USERNAME);
  }

  ngOnInit() {
  }

}
