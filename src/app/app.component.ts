import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './service/auth/auth.service';
import { Component, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Artista } from './model/artista';
import { LoginComponent }  from './component/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // ,providers: [AuthenticationService]
})

export class AppComponent{
	isLogged : boolean;
	// router: Router;
	// authenticationService :AuthenticationService;
	subscription : any;

	constructor(private router: Router, private authenticationService: AuthenticationService) {
		// this.router=router;
		// this.authenticationService = authenticationService;
				
		//	this.subscription = this.authenticationService.getEmittedValue()
		//								  .subscribe(item => this.isLogged = item );							
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

	ngOnInit() {
		//this.subscription = this.authenticationService.getEmittedValue()
		this.subscription = this.authenticationService.getEmittedValue()
			.subscribe(item => this.isLogged=item);
  	}

	logout(): void {
        localStorage.removeItem('currentUser');
		this.isLogged = false;
    }	
}
