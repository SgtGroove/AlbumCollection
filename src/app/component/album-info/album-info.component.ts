import { Component, OnInit } from '@angular/core';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
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
  audio = new Audio();

  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) {
  }

  ngOnInit() {  
      this.sub = this.route.params.subscribe(params => {
        // Prendo la variabile dal path e la uso per caricarmi le info dell'album
        let albumId = params['albumId'];
        this.artistService.getAlbumInfo(albumId)
                           .subscribe(
                               response => {
                                 this.album = response;
                               },
                               err => { console.log(err); });
    });
  }

  playStopTrack(url:string, event: Event){   
    this.audio.pause();
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
  }
}
