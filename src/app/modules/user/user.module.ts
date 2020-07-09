import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FavouritesComponent } from './components/favourites/favourites.component';


@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
