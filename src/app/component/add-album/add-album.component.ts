import { Component, OnInit } from '@angular/core';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
import { ActivatedRoute } from '@angular/router';
import { Album } from '../../model/album';
import { Track } from '../../model/track';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css'],
  providers: [ArtistSearchService]
})
export class AddAlbumComponent implements OnInit {
  sub:any;
  album: Album;
  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) { }

  ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
        // Prendo la variabile dal path e la uso per caricarmi le info dell'album
        let albumId = params['albumId'];
        this.artistService.getAlbumInfo(albumId)
                           .subscribe(
                               response => { this.album = response; },
                               err => { console.log(err); });
    });
  }

}
