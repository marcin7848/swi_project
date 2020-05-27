import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteSongsComponent } from './favourite-songs/favourite-songs.component';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    FavouriteSongsComponent
  ],
  declarations: [FavouriteSongsComponent]
})
export class SharedModule { }
