import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Kweet } from 'src/app/models/Kweet';

@Component({
  selector: 'app-kweet',
  templateUrl: './kweet.component.html',
  styleUrls: ['./kweet.component.scss']
})
export class KweetComponent implements OnInit {
  @Input() kweet: Kweet;

  constructor() {
  }

  ngOnInit() {
  }
}
