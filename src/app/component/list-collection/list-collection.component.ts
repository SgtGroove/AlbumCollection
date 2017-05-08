import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/auth/auth.service';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Album } from '../../model/album';
import { OrderByPipe } from '../../pipes/order-by.pipe';
  

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.css'],
  providers: [ArtistSearchService]
})
export class ListCollectionComponent implements OnInit {
  sub:any;
  selectedOrder:string = "+year";
  albums: Album[];
  constructor(private artistService : ArtistSearchService, private router: Router) { }

  ngOnInit() {
              var token = JSON.parse(localStorage.getItem('currentUser'));              
              // Prendo la variabile dal path e la uso per caricarmi gli album
              this.artistService.getMyCollection(token.token)
                                .subscribe(
                                    response => { this.albums = response; },
                                    err => { 
                                      (error: any) => console.log(error) 
                                    });
        }

}
