import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistSearchService } from "../../service/artist-search/artist-search.service";
import { Artista } from '../../model/artista';
import { Album } from '../../model/album';
import { Track } from '../../model/track';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.css'],
  providers: [ArtistSearchService]
})
export class ArtistInfoComponent implements OnInit {
  artist: Artista;
  subAlbumInfo:any;
  subFormation:any;
  bandMembersHTML: string = "";
  sub: any;
  section: number = -1;
  pageId: number = -1;

  constructor(private artistService : ArtistSearchService, private route: ActivatedRoute) {
  }

  ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
                let artistId = params['artistId'];
                this.artistService.getArtistInfo(artistId)
                                  .subscribe(
                                      response => {
                                        this.artist = response;
                                        this.getBandFormation(this.artist.name);
                                      },
                                      err => { console.log(err); });
        });
  }

  getBandFormation(artistName:string)
  {
        this.subFormation = this.artistService.getAllSectionFromWikiPage(artistName)
                                              .subscribe(
                                                        response => {
                                                          var sectionTag = response.parse.sections.filter(p => p.line.trim().toLowerCase() == ("members") || p.line.trim().toLowerCase() == ("band members") );
                                                          this.pageId = response.parse.pageid;
                                                          this.section = sectionTag[0].index;
                                                          this.artistService.getBandMembers(this.artist.name, this.section)
                                                                            .subscribe(
                                                                                      risposta => {
                                                                                                    this.bandMembersHTML = this.convertMediaWikiToHTML(risposta.query.pages[this.pageId].revisions[0]['*']);
                                                                                                  },
                                                                                      errore => { console.log(errore) });
                                                                    },
                                                         err => { console.log(err);  });
  }
  
  private convertMediaWikiToHTML(members: string) {

      var regexTitle = /==(\s\w*\s)==/gi;
      members = members.replace(regexTitle,"<li class='li_title'>$1</li>");
      var regexLine = /;(\w*\s*)*/gi;
      members = members.replace(regexLine,"<li class='li_title'><h1>$1</h1></li>");
      var regexLink = /\[\[(((\w*\s*)*)(\s\(\w*\)\|(\w*\s*)*)*)\]\]((\s\–*\w*\,*\(*\d*\)*)*)/gi
      members = members.replace(regexLink,"<li>$2 $6</li>");
      var regexStar = /(\*\s)/gi;
      members = members.replace(regexStar,"");
      return members;

      /*
      memberTemp.replace("==","</li>");
      memberTemp.replace(/;/g,"<li>");
      memberTemp.replace(/\*g,"<br />");
      memberTemp.replace(/\[\[/g, "");
      memberTemp.replace(/\]\]/g, "");

      memberTemp.replace("Band Members", "");
      memberTemp.replace("Formation", "");
      */
      
  }

}
