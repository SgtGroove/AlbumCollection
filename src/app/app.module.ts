import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './component/search/search.component';
import { SearchResultsComponent } from './component/search-results/search-results.component';
import { AlbumlistComponent } from './component/albumlist/albumlist.component';


const appRoutes: Routes = [
  {
    path: ':artistId/albums',
    component: AlbumlistComponent,
    data: { title: 'AlbumList' }
  },
  {
    path: 'artists/search/:searchString',
    component: SearchResultsComponent,
    data: { title: 'SearchResult' }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    AlbumlistComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
