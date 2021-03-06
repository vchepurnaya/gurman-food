import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UserRoutingModule } from './modules/user/user-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { EntryComponent } from './components/entry/entry.component';
import { RegisrationComponent } from './components/regisration/regisration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { MatListModule } from '@angular/material/list';
import { SliderComponent } from './components/slider/slider.component';
import { RestPageComponent } from './components/rest-page/rest-page.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastComponent } from './components/toast/toast.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { AboutComponent } from './components/about/about.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchBarComponent,
    EntryComponent,
    RegisrationComponent,
    RestaurantsComponent,
    SliderComponent,
    RestPageComponent,
    ToastComponent,
    PreloaderComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatListModule,
    CarouselModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EntryComponent, RegisrationComponent]
})
export class AppModule {

}
