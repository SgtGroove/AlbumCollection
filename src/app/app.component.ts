import { Component } from '@angular/core';
import { SearchComponent } from './component/search/search.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Artista } from './model/artista';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	constructor(private parentRouter: Router) {
	}

	clicked(artistName : string) {
		if(artistName != "")
			this.parentRouter.navigateByUrl('/artists/search/' + artistName);
	  }
	
}
