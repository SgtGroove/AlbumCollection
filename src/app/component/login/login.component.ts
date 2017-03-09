import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/auth/auth.service';
 
@Component({
    templateUrl: './login.component.html'
    //,providers: [AuthenticationService]

})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    // router : Router;
    // authenticationService:AuthenticationService;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        // this.router = router;
        // this.authenticationService = authenticationService;
     }
 
    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                   this.authenticationService.changeLoginString();
                   //this.router.navigate(['/']);                   
                   this.error = 'Username or password are correct';
                   this.loading = false;
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}