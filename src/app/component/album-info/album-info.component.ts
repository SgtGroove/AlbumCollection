import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
import { Album } from '../../model/album';
import { Track } from '../../model/track';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css'],
  providers: [ArtistSearchService]
})
export class AlbumInfoComponent implements OnInit {
  subAlbumInfo:any;
  subFormation:any;
  album: Album;
  audio = new Audio();
  bandMembersHTML: string = "";
  section: number = -1;
  pageId: number = -1;

  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) {
  }

  ngOnInit() {  
      this.subAlbumInfo = this.route.params.subscribe(params => {
        // Prendo la variabile dal path e la uso per caricarmi le info dell'album
        let albumId = params['artistId'];
        this.artistService.getAlbumInfo(albumId)
                           .subscribe(
                               response => {
                                 this.album = response;
                                 // this.getBandFormation(this.album.artist.name);
                               },
                               err => { console.log(err); });
      }); 
 }
}
