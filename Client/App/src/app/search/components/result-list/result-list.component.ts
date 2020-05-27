import { Component, OnInit } from '@angular/core';
import { SearchResult } from 'src/app/shared/models/search-result';
import { SearchService } from 'src/app/core/services/search-service';
import { SearchQuery } from 'src/app/dashboard/models/search-query';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  public lyrics = '';
  public showList = false;
  public noResutls = false;
  public results: SearchResult[] = [];

  private query: SearchQuery;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    const queryObject = JSON.parse(localStorage.getItem('currentSearch'));
    this.query = Object.assign(new SearchQuery(), queryObject);
    if (this.query?.lyrics) {
      this.lyrics = this.query.lyrics;
    }
    this.searchService.getResults(this.query).subscribe(result => {
      this.results = result;
      this.showList = true;
      this.noResutls = this.results.length === 0;
    });
  }

  public searchClick() {
    const model = new SearchQuery();
    model.lyrics = this.lyrics;
    localStorage.setItem('currentSearch', JSON.stringify(model));
    window.location.reload();
  }

}
