import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Track } from '../../model/track';
import { Album } from '../../model/album';

@Injectable()
export class ArtistSearchService {
  constructor (private http: Http) {

  }
  
  getAlbumsFromArtist(artistId: string)   {
    return this.http.get('https://api.spotify.com/v1/artists/' + artistId + '/albums?limit=50')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAlbumInfo(albumId: string)
  {
    return this.http.get('https://api.spotify.com/v1/albums/' + albumId)
                         .map((res:Response) => this.filtraAlbum(res.json()))
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchAlbumArtist(artist:string, album: string, year: string)
  {
    var pathStart = 'https://api.spotify.com/v1/search?q=';
    var pathType = (album == "" && year == "") ? "&type=artist" : "&type=album";
    var pathQuery = '';
    if(artist != "" && artist != "_none_"){
      pathQuery += 'artist:' + artist + '%20';
    }
    if(album != "" && album != "_none_"){
      pathQuery += 'album:' + album + '%20';
    }
    if(year != "" && year != "_none_"){
      pathQuery += 'year:' + year + '%20';
    }
    var path = pathStart + pathQuery + pathType;
    return this.http.get(path)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getArtists(artist: string) {
        return this.http.get('https://api.spotify.com/v1/search?q=' + artist +'&type=artist')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getArtistInfo(artistId: number){
        return this.http.get('https://api.spotify.com/v1/artists/' + artistId )
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAlbums(album: string) {
        return this.http.get('https://api.spotify.com/v1/search?q=' + album +'&type=album&album_type=album')
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
                         
  }

  getAllSectionFromWikiPage(artist){
    var artistName = artist.replace(/ /g,"_");
    var path =  "https://en.wikipedia.org/w/api.php?origin=*&action=parse&format=json&page="+artistName+"&prop=sections";
    return this.http.get(path)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getBandMembers(artist, section) {
    var artistName = artist.replace(/ /g,"_");
    var path =  "https://en.wikipedia.org/w/api.php?origin=*&action=query&&format=json&prop=revisions&rvprop=content&rvsection=" + section + "&titles=" + artistName;
    return this.http.get(path)
                    .map((resp:Response) => resp.json())
                    .catch((errore:any) => Observable.throw(errore.json().error || 'Server error'));
  }

  filtraAlbum(response: any){
      var d = new Date(response.release_date);
      let year = d.getFullYear();
      let id = response.id;
      let name = response.name;
      let artist = response.artists[0];
      let tracks = Array<Track>();
      let imageUrl = '';
      if(response.images[0] != undefined) {
        imageUrl = response.images[0].url;
      }

      for (var i = 0; i < response.tracks.items.length; i++) {  
        var trackId = response.tracks.items[i].id;
        var trackName = response.tracks.items[i].name;
        var albumName = name;
        var artistName = response.artists[0].name;
        var duration  = ((response.tracks.items[i].duration_ms)/60000).toFixed(2);
        var track_number = response.tracks.items[i].track_number;
        var previewUrl  = response.tracks.items[i].preview_url;
        var uri  = response.tracks.items[i].uri;
        let track = new Track(trackId, trackName, albumName, artistName, duration, track_number,  previewUrl, uri);

        tracks.push(track);
      }

      let album = new Album(id, name, artist, tracks, year, imageUrl);
      return album;
    }
 
 
 
  addAlbum(currentUser:string, artistName : string, artistId: string, albumName: string, albumId: string, year: number, note: string) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers, method: "POST"}); 
        return this.http.post('http://www.consigliamiundisco.it/rest/addAlbum', JSON.stringify({ currentUser: currentUser, 
                                                                                                 artistName: artistName,
                                                                                                 artistId: artistId,
                                                                                                 abumName: albumName,
                                                                                                 albumId: albumId,
                                                                                                 year: year,
                                                                                                note:note }), options)
                         .map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


}
