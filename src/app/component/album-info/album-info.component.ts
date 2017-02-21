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
                                 this.album = this.filtraAlbum(response);
                               },
                               err => { console.log(err); });
    });
  }

  filtraAlbum(response: any){
    var d = new Date(response.release_date);
    let year = d.getFullYear();
    let id = response.id;
    let name = response.name;
    let artist = response.artists[0].name;
    let tracks = Array<Track>();
    let imageUrl = '';
    if(response.images[0] != undefined) {
      imageUrl = response.images[0].url;
    }

    for (var i = 0; i < response.tracks.items.length; i++) {  
      var trackId = response.tracks.items[i].id;
      var trackName = response.tracks.items[i].name;
      var albumName = name;
      var artistName = response.artists[0].name;
      var duration  = ((response.tracks.items[i].duration_ms)/60000).toFixed(2);
      var track_number = response.tracks.items[i].track_number;
      var previewUrl  = response.tracks.items[i].preview_url;
      var uri  = response.tracks.items[i].uri;
      let track = new Track(trackId, trackName, albumName, artistName, duration, track_number,  previewUrl, uri);

      tracks.push(track);
    }

    let album = new Album(id, name, artistName, tracks, year, imageUrl);
    return album;
  }

  playStopTrack(url:string, event: Event){   
    this.audio.pause();
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
  }
}
