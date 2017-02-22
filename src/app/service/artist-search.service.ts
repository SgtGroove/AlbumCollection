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
        return this.http.get('https://api.spotify.com/v1/search?q=' + artist +'&type=artist')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                         
  }

  getAlbums(album: string) {
        return this.http.get('https://api.spotify.com/v1/search?q=' + album +'&type=album&album_type=album')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                         
  }

  getAlbumsFromArtist(artistId: string)   {
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
