import { Component,Injectable,Input,Output,EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    @Output() fire:EventEmitter<any>=new EventEmitter();
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options       = new RequestOptions({ headers: headers, method: "POST"}); 
        return this.http.post('http://www.consigliamiundisco.it/rest/login', JSON.stringify({ username: username, password: password }), options)
                        .map((response: Response) => {
                            if(response.status == 200){
                                // login successful if there's a jwt token in the response
                                let body =  JSON.parse(response.text());
                                let token = body[0].token;
                                if (token) {
                                    this.token = token;
                                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                                    return true;
                                } else {
                                    // return false to indicate failed login
                                    return false;
                                }
                            }
                            return false; 
                        });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    changeLoginString() {
       this.fire.emit(true);
    }

    getEmittedValue() {
        return this.fire;
    }
}