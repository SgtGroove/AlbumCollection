import { Track } from './track';
import { Artista } from './artista';
export class Album {
	constructor(
        public id: number, 
        public name: string, 
        public artist: Artista, 
        public tracks: Array<Track>,
        public year:number,
        public imageUrl:string
    ){}
}
