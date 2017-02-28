import { Component } from '@angular/core';
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

	clicked(artistName : string, albumName : string, year: string) {

		if(artistName != "" && year != "" && albumName == "") {
			var path = '/albums/_none_/artist/' + artistName + '/year/' + year;
			this.parentRouter.navigateByUrl(path);
		}
		else {
			if(artistName != "" || albumName != "") 
			{
				if(artistName != "" && albumName == "")
					this.parentRouter.navigateByUrl('/artists/' + artistName);
				else 
					if(albumName != ""){
						if(artistName == "") artistName =  "_none_";
						if(year == "") 		 year =  "_none_";

						var path = '/albums/' + albumName + '/artist/' + artistName + '/year/' + year;
						this.parentRouter.navigateByUrl(path);
					}
				}
			}
		}

}
