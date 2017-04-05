import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './component/artistlist/artistlist.component';
import { AlbumlistComponent } from './component/albumlist/albumlist.component';
import { AlbumInfoComponent } from './component/album-info/album-info.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticationService } from './service/auth/auth.service';
import { LogoutComponent } from './component/logout/logout.component';
import { AuthGuard } from './guard/authguard.service';
import { AddAlbumComponent } from './component/add-album/add-album.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ArtistInfoComponent } from './component/artist-info/artist-info.component';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { ListCollectionComponent } from './component/list-collection/list-collection.component';

const appRoutes: Routes = [
  {
    path: '', 
    component: SearchFormComponent,
    data: { title: 'Search Form' }
  },
  {
    path: ':artistId/albums',
    component: AlbumlistComponent,
    data: { title: 'Albums Search Result' }
  },
  {
    path: ':artistId/artistInfo',
    component: ArtistInfoComponent,
    data: { title: 'Artist Info' }
  },
  {
    path: 'albumInfo/:albumId',
    component: AlbumInfoComponent,
    data: { title: 'Album Info' }
  },
  {
    path: 'artists/:searchString',
    component: SearchResultsComponent,
    data: { title: 'Artists Search Result' }
  },
  {
    path: 'albums/:albumName/artist/:artistName/year/:year',
    component: AlbumlistComponent,
    data: { title: 'Albums Search Result' }
  }  ,
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login Page' }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logout Page' }
  }
  ,
  {
    path: 'addAlbum/:albumId',
    canActivate: [AuthGuard],
    component: AddAlbumComponent,
    data: { title: 'Add Album' }
  }
  ,
  {
    path: 'myCollection',
    canActivate: [AuthGuard],
    component: ListCollectionComponent,
    data: { title: 'My List' }
  }
];
@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    AlbumlistComponent,
    AlbumInfoComponent,
    LoginComponent,
    LogoutComponent,
    AddAlbumComponent,
    ArtistInfoComponent,
    SearchFormComponent,
    ListCollectionComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule 
  ],
  providers: [AuthGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
