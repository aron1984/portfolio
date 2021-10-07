import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
