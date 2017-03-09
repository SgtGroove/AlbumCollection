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


const appRoutes: Routes = [
  {
    path: ':artistId/albums',
    component: AlbumlistComponent,
    data: { title: 'Albums Search Result' }
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
  }
];
@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    AlbumlistComponent,
    AlbumInfoComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
