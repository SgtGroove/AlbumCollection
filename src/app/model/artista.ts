export class Artista {

    constructor(
        public id: number, 
        public name: string, 
        public href: string,
        public uri: string,
        public images: Array<Object>[3],
        public popularity: string,
        public popularityInt: number
    ){}

}
