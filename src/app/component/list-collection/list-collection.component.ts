import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/auth/auth.service';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Album } from '../../model/album';

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.css'],
  providers: [ArtistSearchService]
})
export class ListCollectionComponent implements OnInit {
  sub:any;
  albums: Album[];
  constructor(private artistService : ArtistSearchService, private router: Router) { }

  ngOnInit() {
              var token = JSON.parse(localStorage.getItem('currentUser'));              
              // Prendo la variabile dal path e la uso per caricarmi gli album
              this.artistService.getMyCollection(token.token)
                                .subscribe(
                                    response => {
                                                  if(response[0].esito)
                                                  {
                                                    this.albums = response[0].albums;
                                                  }
                                                  else
                                                  {
                                                    this.router.navigateByUrl('/login');
                                                  }
                                                },
                                    err => { 
                                      (error: any) => console.log(error) 
                                    });
        }

}
