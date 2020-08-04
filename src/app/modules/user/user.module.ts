import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserContainerComponent } from './containers/user-container/user-container.component';
import { UserRoutingModule } from './user-routing.module';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { InfoComponent } from './components/info/info.component';
import { VisitedComponent } from './components/visited/visited.component';


@NgModule({
  declarations: [
    FavouritesComponent,
    InfoComponent,
    UserContainerComponent,
    VisitedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
