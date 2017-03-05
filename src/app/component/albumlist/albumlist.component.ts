import { Component, OnInit } from '@angular/core';
import { Album } from '../../model/album';
import { Track } from '../../model/track';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css'],
  providers: [ArtistSearchService]
})
export class AlbumlistComponent implements OnInit {
  sub:any;
  albums: Album[];
  albumsView: Array<Array<Album>[]>;
  elementsForRow: number = 3;

  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) {
   }

  ngOnInit() {  
      this.sub = this.route.params.subscribe(params => {
          let artistId = params['artistId'];
          if(artistId !=  undefined){
              this.artistService.getAlbumsFromArtist(artistId)
                                   .subscribe(
                                       response => {
                                         this.albums = response.items;
                                         this.filterAlbumList(this.albums);
                                         this.albumsView = this.createAlbumView(this.albums);
                                       },
                                       err => { console.log(err); });
          }
          else {
            let albumName = params['albumName'];
            let artistName = params['artistName'];
            let year = params['year'];

            this.artistService.searchAlbumArtist(artistName, albumName, year)
                              .subscribe(
                                     response => {
                                        this.albums = response.albums.items;
                                        this.albumsView = this.createAlbumView(this.albums);
                                       },
                              err => {console.log(err);} );
          }
      });
  }

  filterAlbumList(albums: Album[]){
    this.albums = this.removeDuplicatesBy(x => x.name, this.albums);
  }
  
  removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {
      var key = keyFn(x), isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

  createAlbumView(albums: Album[]){
      let arrOut = [];
      let triple = [];
      for (let i = 1; i <= this.albums.length; i++) 
      {
        triple.push(this.albums[i - 1]);
        if (i % this.elementsForRow === 0) 
        {
            arrOut.push(triple);
            triple= [];
        }
      }  
      return arrOut; 
  }

}
