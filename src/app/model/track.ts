export class Track {
    constructor(
		public id: number, 
	    public name: string, 
	    public albumName: string,
	    public artistName: string,
	    public duration: number,
	    public track_number: number,
	    public previewUrl:string,
	    public uri:string,
    ){}
}

