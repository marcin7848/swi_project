import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RecentSong} from '../../dashboard/models/recent-song';
import {SearchResult} from '../../shared/models/search-result';

@Injectable({
  providedIn: 'root'
})
export class JsonserverService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:3000/';

   private static convertSongToRecentSong(song: SearchResult): RecentSong {
    const recentSong = new RecentSong();
    recentSong.Singer = song.Singer;
    recentSong.Song = song.Song;
    recentSong.coverImg = song.coverImg;
    recentSong.SongId = song.id;
    return recentSong;
  }

  public getRecentSongs(limit?: number): Observable<RecentSong[]> {
    let url = this.baseUrl + 'recent_songs?_sort=id&_order=desc';
    if (limit){
      url += '&_limit=' + limit;
    }
    return this.httpClient.get<RecentSong[]>(url);
  }

  public addRecentSong(song: SearchResult) {
    const recentSong = JsonserverService.convertSongToRecentSong(song);
    this.clearRecentSongs(recentSong);
    this.httpClient.post<any>(this.baseUrl + 'recent_songs', recentSong).subscribe();
  }

  private clearRecentSongs(song: RecentSong){
    this.getRecentSongs().subscribe(result => {
      result.forEach((recentSong, i) => {
        if (i < 5){
          // tslint:disable-next-line:triple-equals
          if (recentSong.SongId == song.SongId){
            this.deleteRecentSong(recentSong);
          }
        }else{
          this.deleteRecentSong(recentSong);
        }
      });
    });
  }

  private deleteRecentSong(song: RecentSong){
    this.httpClient.delete(this.baseUrl + 'recent_songs/' + song.id).subscribe();
  }

}

