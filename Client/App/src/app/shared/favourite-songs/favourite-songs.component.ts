import {Component, Input, OnInit} from '@angular/core';
import {RecentSong} from '../../dashboard/models/recent-song';

@Component({
  selector: 'app-favourite-songs',
  templateUrl: './favourite-songs.component.html',
  styleUrls: ['./favourite-songs.component.scss']
})
export class FavouriteSongsComponent implements OnInit {

  isFavouriteSong: boolean;

  constructor() { }

  @Input()
  public SongId: string;

  public static getFavouriteSongs(): string[] {
    const favouriteSongsLocal = localStorage.getItem('favouriteSongs');
    if (favouriteSongsLocal === null){
      localStorage.setItem('favouriteSongs', JSON.stringify({ SongIds : []}));
      return JSON.parse(JSON.stringify({ SongIds : []}));
    }
    return JSON.parse(favouriteSongsLocal).SongIds;
  }

  ngOnInit(): void {
    this.isFavouriteSong = this.isFavouriteSongBySongId(this.SongId);
  }


  public addToFavourites(event, SongId: string){
    event.stopPropagation();
    let favouriteSongs = FavouriteSongsComponent.getFavouriteSongs();
    // tslint:disable-next-line:triple-equals
    favouriteSongs = favouriteSongs.filter(FavouriteSongId => FavouriteSongId != SongId);
    favouriteSongs.push(SongId);
    localStorage.setItem('favouriteSongs', JSON.stringify({ SongIds : favouriteSongs}));
    this.ngOnInit();
  }

  public removeFromFavourites(event, SongId: string){
    event.stopPropagation();
    let favouriteSongs = FavouriteSongsComponent.getFavouriteSongs();
    // tslint:disable-next-line:triple-equals
    favouriteSongs = favouriteSongs.filter(FavouriteSongId => FavouriteSongId != SongId);
    localStorage.setItem('favouriteSongs', JSON.stringify({ SongIds : favouriteSongs}));
    this.ngOnInit();
  }

  public isFavouriteSongBySongId(SongId: string): boolean{
    const favouriteSongs = FavouriteSongsComponent.getFavouriteSongs();
    for (const FavouriteSongId of favouriteSongs){
      // tslint:disable-next-line:triple-equals
      if (FavouriteSongId == SongId){
        return true;
      }
    }

    return false;
  }
}
