import { Component, OnInit, Directive, Output } from '@angular/core';
import { ArtistSearchService } from "../../service/artist-search.service";
import { SearchResultsComponent } from "../search-results/search-results.component";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Artista } from '../../model/artista';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ArtistSearchService],
})

export class SearchComponent implements OnInit {
  search: string;
  artists: Artista[];

  constructor(private artistService : ArtistSearchService) { 
  }

  ngOnInit() {
  }

  clicked() {
        // Prendo tutti gli artisti in base alla ricerca
         this.artistService.getArtists(this.search)
                           .subscribe(
                               response => {
                                 this.artists =  response.artists.items;
                                 this.filtraArtisti(this.artists);
                               },
                               err => { console.log(err); });
  }

  filtraArtisti(artists: Artista[]){
    this.artists.forEach( item => item.popularityInt = parseInt(item.popularity));
    this.artists.sort(function (a, b) {return a.popularityInt - b.popularityInt;}).reverse(); // Ordino l'array decrescente
  }
  
}
