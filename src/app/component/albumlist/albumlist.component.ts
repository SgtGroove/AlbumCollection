import { Component, OnInit } from '@angular/core';
import { Album } from '../../model/album';
import { Track } from '../../model/track';
import { ArtistSearchService } from "../../service/artist-search.service";
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

  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) {
   }

  ngOnInit() {  

      this.sub = this.route.params.subscribe(params => {
        // Prendo la variabile dal path e la uso per caricarmi gli album
        let artistId = params['artistId'];
        if(artistId ==  undefined){
            // Se non è presente l'artista prendo una stringa di ricerca
            let albumName = params['searchString'];
            this.artistService.getAlbums(albumName)
                               .subscribe(
                                   response => {
                                     this.albums = response.albums.items;
                                   },
                                   err => {console.log(err);} );
        }
        else {
              this.artistService.getAlbumsFromArtist(artistId)
                                   .subscribe(
                                       response => {
                                         this.albums = response.items;
                                         this.filterAlbumList(this.albums);
                                       },
                                       err => { console.log(err); });
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
}
