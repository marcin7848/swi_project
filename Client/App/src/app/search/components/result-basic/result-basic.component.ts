import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from 'src/app/shared/models/search-result';
import { SearchQuery } from 'src/app/dashboard/models/search-query';

@Component({
  selector: 'app-result-basic',
  templateUrl: './result-basic.component.html',
  styleUrls: ['./result-basic.component.scss']
})
export class ResultBasicComponent implements OnInit {

  @Input()
  public song: SearchResult;

  constructor() { }

  ngOnInit() {
  }

  artistSearch() {
    const model = new SearchQuery();
    model.artist = this.song.Singer;
    localStorage.setItem('currentSearch', JSON.stringify(model));
    window.location.reload();
  }

  albumSearch() {
    const model = new SearchQuery();
    model.album = this.song.Album;
    localStorage.setItem('currentSearch', JSON.stringify(model));
    window.location.reload();
  }
}
