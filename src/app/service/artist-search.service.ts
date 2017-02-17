import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ArtistSearchService {
  constructor (private http: Http) {

  }

  getArtists(artist: string) {

         //return this.http.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist +'&api_key=162051927391c83b1d24e9c61cfdc01a&format=json')

        return this.http.get('https://api.spotify.com/v1/search?q=' + artist +'&type=artist')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                         
  }
  getAlbumsFromArtist(artistId: string)
  {
    return this.http.get('https://api.spotify.com/v1/artists/' + artistId + '/albums?limit=50')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  getAlbumInfo(albumId: string)
  {
    return this.http.get('https://api.spotify.com/v1/albums/' + albumId)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
