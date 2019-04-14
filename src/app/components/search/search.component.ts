import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Kweet } from 'src/app/models/Kweet';
import { KweetService } from 'src/app/services/kweet/kweet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  kweets = new Array<Kweet>();

  noMoreKweets = false;
  pageNumber = 0;
  isFirstSearch = true;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private kweetService: KweetService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  searchForKweets() {
    const search = this.searchForm.get('search').value;
    this.kweetService.findKweetsWithSearch(search, this.pageNumber).then(res => {
      this.checkForNoMoreKweets(res);
      this.isFirstSearch = false;
    }).catch(() => {
      this.toastr.error("Something went wrong while searching for kweets.");
    });
  }

  getNewKweets() {
    this.pageNumber++;
    const search = this.searchForm.get('search').value;
    this.kweetService.findKweetsWithSearch(search, this.pageNumber).then(res => {
      this.checkForNoMoreKweets(res);
    }).catch(() => {
      this.toastr.error("Something went wrong while searching for kweets.");
    });
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
}
