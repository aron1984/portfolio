import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadmeComponent } from './pages/readme/readme.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PorjectsComponent } from './pages/porjects/porjects.component';
import { ProfileComponent } from './section/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home',component: HomeComponent},
  /*{ path: 'about', component....*/
  { path: 'readme',component: ReadmeComponent},
  { path: 'projects',component: PorjectsComponent},
  { path: 'contact', component: ContactComponent},
  { path: '**', pathMatch: 'full',redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
