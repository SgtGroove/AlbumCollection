import { Component, OnInit } from '@angular/core';
import { ArtistSearchService } from "../../service/artist-search.service";
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../model/album';
import { Track } from '../../model/track';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css'],
  providers: [ArtistSearchService]
})
export class AlbumInfoComponent implements OnInit {
  sub:any;
  album: Album;

  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) {
   }

  ngOnInit() {  
      this.sub = this.route.params.subscribe(params => {
        // Prendo la variabile dal path e la uso per caricarmi le info dell'album
        let albumId = params['albumId'];
        this.artistService.getAlbumInfo(albumId)
                           .subscribe(
                               response => {
                                 this.album = this.filtraAlbum(response);
                               },
                               err => { console.log(err); });
    });
  }

  filtraAlbum(response: any){
    let year = response.release_date;
    let id = response.id;
    let name = response.name;
    let artist = response.artists[0];
    let tracks = Array<Track>();
    
    let album =new Album( id, name, artist, tracks, year);
    return album;
  }

}