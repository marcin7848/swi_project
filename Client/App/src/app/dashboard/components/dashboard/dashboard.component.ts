import { Component, OnInit } from '@angular/core';
import { SearchQuery } from '../../models/search-query';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {FavouriteSongsComponent} from '../../../shared/favourite-songs/favourite-songs.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(private router: Router)
  {
    this.initForm();
  }

  ngOnInit() {
  }

  public searchClick() {
    const model = Object.assign(new SearchQuery(), {
      lyrics: this.searchForm.get('lyrics').value,
      artist: this.searchForm.get('advancedSearch.artist').value,
      genre: this.searchForm.get('advancedSearch.genre').value,
      album: this.searchForm.get('advancedSearch.album').value,
      writers: this.searchForm.get('advancedSearch.writers').value,
      producers: this.searchForm.get('advancedSearch.producers').value
    });
    localStorage.setItem('currentSearch', JSON.stringify(model));
    this.router.navigateByUrl('search');
  }

  public showFavouriteSongs() {
    const favouriteSongs = FavouriteSongsComponent.getFavouriteSongs();
    const model = Object.assign(new SearchQuery(), {
      ids: favouriteSongs
    });
    localStorage.setItem('currentSearch', JSON.stringify(model));
    this.router.navigateByUrl('search');
  }

  private initForm() {
    this.searchForm = new FormGroup({
      lyrics: new FormControl(null)
    });
  }
}

