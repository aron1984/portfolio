import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { WelcomeComponent } from './section/welcome/welcome.component';
import { ProfileComponent } from './section/profile/profile.component';
import { MapComponent } from './section/map/map.component';
import { ReadmeComponent } from './pages/readme/readme.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PorjectsComponent } from './pages/porjects/porjects.component';
import { HomeComponent } from './pages/home/home.component';
import { MapaComponent } from './pages/mapa/mapa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    ProfileComponent,
    MapComponent,
    ReadmeComponent,
    ContactComponent,
    PorjectsComponent,
    HomeComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LeafletModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
