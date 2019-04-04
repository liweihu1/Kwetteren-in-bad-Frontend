import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Kweet } from 'src/app/models/Kweet';
import { Constants } from 'src/app/constants/api.consts';

@Component({
  selector: 'app-kweet',
  templateUrl: './kweet.component.html',
  styleUrls: ['./kweet.component.scss']
})
export class KweetComponent implements OnInit {
  @Input() kweet: Kweet;
  @Output() kweetDeleted = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  checkAuthorForKweet(): boolean {
    return this.kweet.author.id === (JSON.parse(localStorage.getItem(Constants.CURRENT_USER)).id);
  }

  deleteKweet() {
    this.kweetDeleted.emit(this.kweet);
  }
}
