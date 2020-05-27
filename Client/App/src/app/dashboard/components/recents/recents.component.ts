import { Component, OnInit } from '@angular/core';
import {RecentSong} from '../../models/recent-song';
import {JsonserverService} from '../../../core/services/jsonserver.service';
import {SelectItem} from 'primeng/api';
import {Router} from '@angular/router';
import {SearchQuery} from '../../models/search-query';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss']
})
export class RecentsComponent implements OnInit {

  recentSongs: RecentSong[] = [];
  recentSongList: SelectItem[] = [];
  recentSongSelected: string;

  constructor(private jsonserverService: JsonserverService, private router: Router) { }

  ngOnInit() {
    this.jsonserverService.getRecentSongs(4).subscribe(result => {
      this.recentSongs =  result;
      this.recentSongs.forEach(song => this.recentSongList.push({label: song.Singer + ' - ' + song.Song, value: song}));
    });
  }

  public searchRecentSong(event, song: RecentSong){
    event.stopPropagation();
    const model = Object.assign(new SearchQuery(), {
      ids: [song.SongId]
    });
    localStorage.setItem('currentSearch', JSON.stringify(model));
    this.router.navigateByUrl('search');
  }

}
