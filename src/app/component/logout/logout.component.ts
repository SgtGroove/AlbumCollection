import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {     
     this.authenticationService.changeLoginString(false);
     localStorage.removeItem('currentUser');
  }

  ngOnInit() {
  }

}
