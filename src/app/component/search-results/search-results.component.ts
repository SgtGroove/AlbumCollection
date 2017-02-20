import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistSearchService } from "../../service/artist-search.service";
import { Artista } from '../../model/artista';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [ArtistSearchService]
})
export class SearchResultsComponent implements OnInit {
  artists: Artista[];
  sub:any;
  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) {
   }

  ngOnInit() {  
      this.sub = this.route.params.subscribe(params => {
        // Prendo la variabile dal path e la uso per caricarmi gli album
        let artistName = params['searchString'];
        this.artistService.getArtists(artistName)
                           .subscribe(
                               response => {
                                 this.artists = response.artists.items;
                                 this.filtraArtisti(this.artists);
                               },
                               err => { console.log(err); });
    });
  }

  filtraArtisti(artists: Artista[]){
    this.artists.forEach( item => item.popularityInt = parseInt(item.popularity));
    this.artists.sort(function (a, b) {return a.popularityInt - b.popularityInt;}).reverse(); // Ordino l'array decrescente
  }

}
