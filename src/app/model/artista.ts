export class Artista {
    public id: number; 
    public name: string; 
    public href: string;
    public uri: string;
    public images: Array<Object>;
    public popularity: string;
    public popularityInt: number;
    constructor(
         id: number, 
         name: string, 
         href: string,
         uri: string,
         images: Array<Object>,
         popularity: string,
         popularityInt: number
    ){
        this.id    = id;
        this.name  = name;
        this.href  = href;
        this.uri   = uri;
        this.images=  images;
        this.popularity     = popularity;
        this.popularityInt  = popularityInt;
    }
}
