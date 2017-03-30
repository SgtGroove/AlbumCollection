import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../../service/auth/auth.service';
import { Component, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

	clicked(artistName : string, albumName : string, year: string) {

		if(artistName != "" && year != "" && albumName == "") {
			var path = '/albums/_none_/artist/' + artistName + '/year/' + year;
			this.router.navigateByUrl(path);
		}
		else {
			if(artistName != "" || albumName != "") 
			{
				if(artistName != "" && albumName == "")
					this.router.navigateByUrl('/artists/' + artistName);
				else 
					if(albumName != ""){
						if(artistName == "") artistName =  "_none_";
						if(year == "") 		 year =  "_none_";

						var path = '/albums/' + albumName + '/artist/' + artistName + '/year/' + year;
						this.router.navigateByUrl(path);
					}
				}
			}
		}
}
