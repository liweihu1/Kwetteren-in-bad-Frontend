import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-following-card',
  templateUrl: './following-card.component.html',
  styleUrls: ['./following-card.component.scss']
})
export class FollowingCardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
