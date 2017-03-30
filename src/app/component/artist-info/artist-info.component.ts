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
                                                          if(response.parse == undefined){
                                                            this.errorMembers = true;
                                                            this.errorDiscography = true;
                                                            return ;
                                                          }

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
                                                                                                      this.bandMembersHTML = this.convertMediaWikiToHTML(risposta.query.pages[this.pageId].revisions[0]['*'],"_none_");
                                                                                                    },
                                                                                        errore => { console.log(errore) });
                                                            
                                                          }
                                                          
                                                          var sectionTag = response.parse.sections.filter(p => p.line.trim().toLowerCase() == ("discography"));
                                                          if(sectionTag[0] == undefined){
                                                            this.errorDiscography = true;
                                                          }
                                                          else {
                                                            this.sectionDiscography = sectionTag[0].index;
                                                            // Discography
                                                            this.artistService.getSectionFromWikiPage(this.artist.name, this.sectionDiscography)
                                                                           .subscribe(
                                                                                        risposta => {
                                                                                                      this.discographyHTML = this.convertMediaWikiToHTML(risposta.query.pages[this.pageId].revisions[0]['*'], risposta.query.pages[this.pageId].title);
                                                                                                    },
                                                                                        errore => { console.log(errore) });
                                                              }
                                                          },
                                                         err => { console.log(err);  });
  }
  
  private convertMediaWikiToHTML(membersInput: string, artistInput: string) {

      // Elimino la Sezione della timeline (attualmente ingestibile)
      var regexTimeLine = /((\=\=\=\sTimeline\s\=\=\=)|(Timeline))([\s\w\d\<\!\-\=\/\>\{\#\:\|\}\(\.\)\!\,"]*)/gi;
      membersInput = membersInput.replace(regexTimeLine,"");
      
      var memberSplit = membersInput.split(/\r?\n/);
      var returnStr = "";

      for(var i = 0; i < memberSplit.length; i++)
      {
          var members = "";
          var members = memberSplit[i];
          // Rimuovo i tag small aperti e chiusi
          var regexSmall = /\<small>/gi;
          members = members.replace(regexSmall,"");
          var regexSmall = /\<\/small>/gi;
          members = members.replace(regexSmall,"");
          // Rimuovo le references
          var regexReferences = /(\<ref\>\{\{[\w\d\s\|\=\:\/\.\,\;\:\-\}\+]*\<\/ref\>)/gi;
          members = members.replace(regexReferences,"");
          //ColBegin, 
          var regexColBegin =/((\{\{col\-begin\}\})|\{\{col-2\}\}|\{\{col\-end\}\})/gi
          members = members.replace(regexColBegin,"");
          // Rimuovo i commenti
          var regexCommenti = /(\<\!\-\-[\w\s\,\.\-\?\!\=\*]*([\*]|[\-\-\>]))/gi;
          members = members.replace(regexCommenti,"");
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
          var regexLink = /(\*\s?)?\[\[(((\w*\s*)*)(\s\(\w*\)\|(\w*\s*)*)*)\]\]((\s?|&nbsp;)\–(\s?|&nbsp;)[\s\w\,]*)([\(\w\s\)\,\-\–\;\:\[\"\]\<\=\>\.\/\{\}\|]*)/gi
          members = members.replace(regexLink,"<div class='col-md-10 cool-md-offset-1 col-xs-10 col-xs-offset-1 fontSize14px'>$3 <span class='colorGrey'>$7</span></div>");
          // Sezione che inzia con le {{}}
          var regexMainTitle = /(\{\{([\w\s\|\/\:\,\;\_\!\?\=\.])*}})/gi;
          members = members.replace(regexMainTitle,"");
          // Sezione che inizia con * ''[[ --> sezione per gli album
          var regexAlbum = /((\*\s*)(\'\')*)\[\[([\"\w\s\.\'\&\!\?\-]*)([\|\w\(\)\s\/\.\"\'\&]*)\]\][\'\'\s\(\)\w]*(\([\d\,\w\s]*\))([\s\(\w\)]*)([\s\w\[\&\'\/\]\]\(\,\)\|\!]*)/gi;
          members = members.replace(regexAlbum,"<div class='col-md-10 cool-md-offset-1 col-xs-10 col-xs-offset-1 fontSize14px'> - <a href=\"/albums/$4/artist/"+artistInput+"/year/_none_\">$4</a> $6</div>");
          // Elimino le righe intermedie con inziano con *
          var regexPulisciRigheIntermedie = /\*\s?[\w\s\[\]\;\&\–\,\?\!\,\.\_\(\)\[\]\-\ñ\<\>\"\/\(\)\-\í\ó]*/gi
          members = members.replace(regexPulisciRigheIntermedie,"");
          // Titoli che iniziano con ; e finiscono con ;
          var regexLine = /^\;([\w\s]*)\s*/gi;
          members = members.replace(regexLine,"<div class='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 titleParagrafo marginTop10'>$1</div>");
          // Rimuovo i file
          var regexFile = /(\[\[File\:([\s\w\-\:\.\;\,\|\[\]\{\}\!\?\^\"\']*))/gi;
          members = members.replace(regexFile,"");
          // Rimuovo le note
          var regexNote = /(Note\:([\w\s\,\[\]\(\)\'\/\.\?\:\;\.\,]*))/gi;
          members = members.replace(regexNote,"");
          // Pulisco il numero di colonne
          var regexColumns = /\{\{Columns\-list\|[\d]\|/gi;
          members = members.replace(regexColumns,"");
          // Rimuovo le parentesi graffe  chiuse rimaste appese
          var regexGraffeChiuse = /\}\}/gi;
          members = members.replace(regexGraffeChiuse,"");
          returnStr = returnStr + members;

      }
      return returnStr;     
  }

}
