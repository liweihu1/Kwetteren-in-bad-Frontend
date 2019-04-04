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

  kweets: Array<Kweet>;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private kweetService: KweetService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  searchForKweets() {
    const search = this.searchForm.get('search').value;
    this.kweetService.findKweetsWithSearch(search).then(res => {
      this.kweets = res;
    }).catch(() => {
      this.toastr.error("Something went wrong while searching for kweets.");
    });
  }
}
