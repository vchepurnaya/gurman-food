import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'favourites',
        component: FavouritesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
