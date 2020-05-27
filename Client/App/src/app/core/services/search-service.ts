import { Injectable } from '@angular/core';
import { SearchQuery } from 'src/app/dashboard/models/search-query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SearchResponse } from 'src/app/shared/models/search-response';
import { SearchResult } from 'src/app/shared/models/search-result';
import { DiscogsResult, DsingleResult } from 'src/app/dashboard/models/discogs-result';
import { YoutubeItem, YoutubeResult } from 'src/app/dashboard/models/youtube-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:8983/solr/swi_core/select?q=';
  private endUrl = '&wt=json';

  constructor(private httpClient: HttpClient) { }

  public getResults(query: SearchQuery): Observable<SearchResult[]> {
    return this.search(query).pipe(map(res => {
      const songs: SearchResult[] = [];
      const results = res?.response?.docs;
      if (results && results.length > 0) {
        results.forEach(result => {
          result.coverImg = "../../assets/no_cover.jpg"
          result.YTUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // TODO: loading YT videos
          console.log(result.coverImg)

          var newObject = Object.assign(new SearchResult(), result)
          this.getCover(result.Singer, result.Song).subscribe(data => newObject.coverImg = data.thumb)
          this.getYoutubeVideo(result.Singer, result.Song).subscribe(data => newObject.YTUrl = `https://www.youtube.com/embed/${data.id.videoId}`)
          songs.push(newObject);
        });
      }
      return songs;
    }));
  }

  public getCover(artist:string, title:string):Observable<DsingleResult>{
    var key = "nORxuABTzvnczPtfKsPc"
    var secret = "PbPuUfqXWOQbyHaDBTIlgbMXfrQrVUSi"

    var url = "https://api.discogs.com/database/search?q="
    var uri = encodeURI(`${artist}-${title}&key=${key}&secret=${secret}`)
    console.log(url+uri)
    // Trzeba zrobić zapytanie get i wziąć pierwszy obiekt z tablicy results i jego atrybut thumb jest url do covera
    return this.httpClient.get<DiscogsResult>(url+uri).pipe(map(data => data.results[0]));
  }

  public getYoutubeVideo(artist:string, title:string):Observable<YoutubeItem>{
    var key = "AIzaSyCRkQmqu7UY6ma6NciSam3wQyadsn5F51Q"

    var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=Michael%20Jackson%20-%20Beat%20it&key=${key}}`
    // Trzeba zrobić zapytanie get i wziąć pierwszy obiekt z tablicy results i jego atrybut thumb jest url do covera
    return this.httpClient.get<YoutubeResult>(url).pipe(map(data => data.items[0]));
  }

  private search(query: SearchQuery): Observable<SearchResponse> {
    // to do make this fully working

    const array = [
      this.singleToQuery(query.lyrics, 'Lyrics'),
      this.singleToQuery(query.artist, 'Singer'),
      this.singleToQuery(query.album, 'Album'),
      this.splitToQuery(query.genre, 'Genres'),
      this.splitToQuery(query.writers, 'Writers'),
      this.splitToQuery(query.producers, 'Producers'),
      this.idsToQuery(query.ids)
    ];

    const result = this.arrayToQuery(array);
    // console.log(`Query = ${result}`);
    return this.httpClient.get<SearchResponse>(this.baseUrl + result + this.endUrl);
  }

  private singleToQuery(input: string, attributeName: string): string{
    if (input){
      console.log('single');
      return `${attributeName}:"${input}"`;
    }else{
      return '';
    }
  }

  private splitToQuery(input: string, attributeName: string): string{
    let result = '';

    if (input){
      const splitted = input.split(',');
      let counter = 0;

      for (const element of splitted) {
        if (counter > 0){
          result += ' OR ';
        }
        result += `${attributeName}:"${element.trim()}"`;
        counter += 1;
      }
    }
    if (result){
      result = '(' + result + ')';
    }
    return `${result}`;
  }

  private idsToQuery(input: string[]): string{
    // tslint:disable-next-line:triple-equals
    if (!input || input.length == 0){
      return '';
    }

    let result = '';
    input.forEach((SongId, i) => result += 'id:' + SongId + '^' + (i + 2));

    return result;
  }

  private arrayToQuery(array: string[]): string{
    const finalArray = [];
    for (const query of array) {
      if (query != ''){
        finalArray.push(query);
      }
    }

    let result = '';
    const numOfElements = finalArray.length;
    let counter = 0;

    for (const query of finalArray){
      if (counter < numOfElements - 1){
        result += query + ' AND ';
      } else {
        result += query;
      }
      counter += 1;
    }

    return result;
  }
}

