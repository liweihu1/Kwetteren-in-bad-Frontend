import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test-data/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(testService: TestService) { 
    
  }

  ngOnInit() {
  }

}
