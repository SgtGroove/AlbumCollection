import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
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
  date = new Date();
  addingAlbum : boolean = false;
  message : string;
  esito  : boolean;
  
  private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        inline: false,
        width: '100%'
  };

  private model: Object = { date: { year: (new Date()).getFullYear() , month: (new Date()).getMonth() + 1, day: (new Date()).getDate()} };  
  
  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) { 
      // this.addingAlbum = false;
  }
  
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
  
  addClick( artistName : string, artistId: string, albumName:string, albumId: string, year: number, note: string) {
      this.addingAlbum = true;
      let currentUser =  JSON.parse(localStorage.getItem('currentUser')).username;
      this.artistService.addAlbum(currentUser, artistName, artistId, albumName, albumId, year, note)
                              .subscribe (
                                     response => {
                                        this.esito = (response[0].esito == "true") ? true : false;
                                        this.message = response[0].message;
                                       },
                                     err => {console.log(err);});
    }
}

