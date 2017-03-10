import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/auth/auth.service';
 
@Component({
    templateUrl: './login.component.html'
    //,providers: [AuthenticationService]

})
 
export class LoginComponent {
    model: any = {};
    loading = false;
    loginSuccess = false;
    username = '';
    error = '';

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }
 
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
                                  .subscribe(result => {
                                                if (result === true) {
                                                    this.authenticationService.changeLoginString(true);
                                                    this.loginSuccess = true;
                                                    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
                                                } else {
                                                    this.error = 'Username or password is incorrect';
                                                    this.loading = false;
                                                }
                                            });
    }
}