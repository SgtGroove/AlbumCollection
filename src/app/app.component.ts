import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './service/auth/auth.service';
import { Component, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { Artista } from './model/artista';
import { LoginComponent } from './component/login/login.component';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  ,providers: [AuthenticationService]
})

export class AppComponent{
	isLogged : boolean;
	username : string;
	subscription : Subscription;

	constructor(private router: Router, private authenticationService: AuthenticationService) {
		var cu = JSON.parse(localStorage.getItem('currentUser'));
		if(cu == null  ){
			this.subscription = this.authenticationService
									.getEmittedValue()
									.subscribe(item => {this.username = item; this.isLogged = true;});			
		}
		else {
			// TODO: controllare se il token è valido
			this.username = cu.username;
			this.isLogged = true;
		}
	}
}

