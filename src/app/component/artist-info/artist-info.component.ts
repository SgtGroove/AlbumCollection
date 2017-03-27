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
  sub: any;
  subAlbumInfo:any;
  subFormation:any;
  bandMembersHTML: string = "";
  discographyHTML: string = "";
  pageId: number = -1;
  sectionBandMember: number = -1;
  sectionDiscography: number = -1;
  errorMembers = false;
  errorDiscography = false;
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
                                                          this.pageId = response.parse.pageid;
                                                          var sectionTag = response.parse.sections.filter(p => p.line.trim().toLowerCase() == ("members") || p.line.trim().toLowerCase() == ("band members") );
                                                          if(sectionTag[0] == undefined){
                                                            this.errorMembers = true;
                                                          }
                                                          else {
                                                            this.sectionBandMember = sectionTag[0].index;
                                                            // Band Members
                                                            this.artistService.getSectionFromWikiPage(this.artist.name, this.sectionBandMember)
                                                                              .subscribe(
                                                                                        risposta => {
                                                                                                      this.bandMembersHTML = this.convertMediaWikiToHTML(risposta.query.pages[this.pageId].revisions[0]['*']);
                                                                                                    },
                                                                                        errore => { console.log(errore) });
                                                            
                                                          }
                                                          
                                                          var sectionTag = response.parse.sections.filter(p => p.line.trim().toLowerCase() == ("discography"));
                                                          if(sectionTag[0] == undefined){
                                                            this.errorMembers = true;
                                                          }
                                                          else {
                                                            this.sectionDiscography = sectionTag[0].index;
                                                            // Discography
                                                            this.artistService.getSectionFromWikiPage(this.artist.name, this.sectionDiscography)
                                                                           .subscribe(
                                                                                        risposta => {
                                                                                                      this.discographyHTML = this.convertMediaWikiToHTML(risposta.query.pages[this.pageId].revisions[0]['*']);
                                                                                                    },
                                                                                        errore => { console.log(errore) });
                                                              }
                                                          },
                                                         err => { console.log(err);  });
  }
  
  private convertMediaWikiToHTML(membersInput: string ) {

      // Elimino la Sezione della timeline (attualmente ingestibile)
      var regexTimeLine = /((\=\=\=\sTimeline\s\=\=\=)|(Timeline))([\s\w\d\<\!\-\=\/\>\{\#\:\|\}\(\.\)\!\,"]*)/gi;
      membersInput = membersInput.replace(regexTimeLine,"");
      
      var memberSplit = membersInput.split(/\r?\n/);
      var returnStr = "";

      for(var i = 0; i < memberSplit.length; i++)
      {
          var members = "";
          var members = memberSplit[i];

          // Titoli che iniziano con '''
          var regexTitleApici = /\'\'\'([\s\w]*)\'\'\'/gi;
          members = members.replace(regexTitleApici,"<div class='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 titleParagrafo marginTop10'>$1</div>");
          // Titoli che iniziano con ===
          var regexTitle3 = /===([\s\w]*)===/gi;
          members = members.replace(regexTitle3,"<div class='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 titleParagrafo marginTop10'>$1</div>");
          // Titoli che iniziano con ==
          var regexTitle = /==([\s\w]*)==/gi;
          members = members.replace(regexTitle,"<div class='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 titleParagrafo marginTop10'>$1</div>");
          // Link contenenti [[ e ]] e che iniziano con i caratteri "; " (spazio) --> sezione per gli elementi della band
          var regexLink = /\*\s?\[\[(((\w*\s*)*)(\s\(\w*\)\|(\w*\s*)*)*)\]\]((\s?|&nbsp;)\–(\s?|&nbsp;)[\s\w\,]*)([\(\w\s\)\,\-\–\;\:\[\"\]\<\=\>\.\/\{\}\|]*)/gi
          members = members.replace(regexLink,"<div class='col-md-10 cool-md-offset-1 col-xs-10 col-xs-offset-1 fontSize14px'>$2 <span class='colorGrey'>$6</span></div>");
          // Sezione che inzia con le {{}}
          var regexMainTitle = /(\{\{([\w\s\|\/\:\,\;\_\!\?\=\.])*}})/gi;
          members = members.replace(regexMainTitle,"");
          // Sezione che inizia con * ''[[ --> sezione per gli album
          var regexAlbum = /((\*\s)(\'\')*)\[\[([\"\w\s\.\'\&\!\?\-]*)([\|\w\(\)\s\/\.\"\'\&]*)\]\][\'\'\s\(\)\w]*(\([\d\,\w\s]*\))([\s\(\w\)]*)([\s\w\[\&\'\/\]\]\(\,\)\|\!]*)/gi;
          members = members.replace(regexAlbum,"<div class='col-md-10 cool-md-offset-1 col-xs-10 col-xs-offset-1 fontSize14px'> - $4 $6</div>");
          // Elimino le righe intermedie con inziano con *
          var regexPulisciRigheIntermedie = /\*\s?[\w\s\[\]\;\&\–\,\?\!\,\.\_\(\)\[\]\-]*/gi
          members = members.replace(regexPulisciRigheIntermedie,"");
          // Titoli che iniziano con ; e finiscono con ;
          var regexLine = /^\;([\w\s]*)\s*/gi;
          members = members.replace(regexLine,"<div class='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 titleParagrafo marginTop10'>$1</div>");

          var regexNote = /(Note\:([\w\s\,\[\]\(\)\'\/\.\?\:\;\.\,]*))/gi;
          members = members.replace(regexNote,"");
          returnStr = returnStr + members;
      }
      return returnStr;     
  }

}
