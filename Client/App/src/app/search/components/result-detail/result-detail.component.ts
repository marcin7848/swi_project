import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from 'src/app/shared/models/search-result';
import {DomSanitizer} from '@angular/platform-browser';
import {JsonserverService} from '../../../core/services/jsonserver.service';
import {RecentSong} from '../../../dashboard/models/recent-song';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {

  @Input()
  public song: SearchResult;

  public YTUrl = null;

  constructor(
    private sanitizer: DomSanitizer,
    private jsonserverService: JsonserverService,
    private youtubeService: YoutubeService) { }

  ngOnInit() {
    // this.YTUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.song.YTUrl);
    // console.log(this.YTUrl);
    this.jsonserverService.addRecentSong(this.song);

    this.getSongURL();
  }

  public getSongURL() {
    this.youtubeService.searchVideo(this.song).subscribe(result => {
      const id = result?.items[0]?.id?.videoId;
      if (id) {
        this.YTUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`);
      }
    });
  }

}
