import { Component, OnInit, Input } from '@angular/core';
import { Artista } from '../../model/artista';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() artists: Artista[];
  constructor() { }

  ngOnInit() {
  }

}
