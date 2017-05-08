import { Pipe, PipeTransform } from '@angular/core';
import { Album } from '../model/album';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(albums: Album[], args?: any): any {
     if(!Array.isArray(albums)) return albums; // se non mi arriva un array ritorno quello che ho
     if(!args[0]) return albums;               // se non ho argomenti ritorno l'array iniziale
     
     var order = args.substr(0, 1);
     var property = args.substr(1, args.length - 1);
     console.log("ORDER->" + order + "PROP->" + property);

     if(property == "year")
        albums.sort(this.compareByYear);

     if(property == "albumName")
        albums.sort(this.compareByAlbumName);

     if(property == "artistName")
        albums.sort(this.compareByArtistName);

     return albums
  }

  compareByYear(a,b) {
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    return 0;
  }
  compareByAlbumName(a,b){
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }

  compareByArtistName(a,b){
    if (a.artist.name < b.artist.name) return -1;
    if (a.artist.name > b.artist.name) return 1;
    return 0;
  }
}
