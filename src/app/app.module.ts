import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './component/search/search.component';
import { SearchResultsComponent } from './component/search-results/search-results.component';
import { AlbumlistComponent } from './component/albumlist/albumlist.component';
import { AlbumInfoComponent } from './component/album-info/album-info.component';


const appRoutes: Routes = [
  {
    path: ':artistId/albums',
    component: AlbumlistComponent,
    data: { title: 'Albums Search Result' }
  },
  {
    path: 'albums/search/:searchString',
    component: AlbumlistComponent,
    data: { title: 'Albums Search Result' }
  },
  {
    path: 'albumInfo/:albumId',
    component: AlbumInfoComponent,
    data: { title: 'Album Info' }
  },
  {
    path: 'artists/search/:searchString',
    component: SearchResultsComponent,
    data: { title: 'Artists Search Result' }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    AlbumlistComponent,
    AlbumInfoComponent
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
