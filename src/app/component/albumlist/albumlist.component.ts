import { Component, OnInit } from '@angular/core';
import { Album } from '../../model/album';
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
        let artistName = params['artistName'];
        this.artistService.getAlbumsFromArtist(artistName)
                           .subscribe(
                               response => {
                                 this.albums =  response.topalbums.album
                               },
                               err => { console.log(err); });
    });
  }

}
