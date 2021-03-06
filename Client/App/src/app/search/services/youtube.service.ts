import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from 'src/app/shared/models/search-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

private mainUrl = 'https://www.googleapis.com/youtube/v3/search?maxResults=1&q=';
private key = '&key=AIzaSyD72suR-DaARg34J7fE3WzhWBLSj1bDHNA';

constructor(private httpClient: HttpClient) { }

public searchVideo(song: SearchResult): Observable<any> {
  const url = this.mainUrl + song.Singer + ' ' + song.Song + this.key;
  return this.httpClient.get(url);
}

}
