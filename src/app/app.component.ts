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
	subscription : Subscription;

	constructor(private router: Router, private authenticationService: AuthenticationService) {
		this.subscription = this.authenticationService.getEmittedValue()
				.subscribe(item => this.isLogged = item);			
	}
}
