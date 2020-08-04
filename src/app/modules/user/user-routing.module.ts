import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserContainerComponent } from './containers/user-container/user-container.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { InfoComponent } from './components/info/info.component';
import { VisitedComponent } from './components/visited/visited.component';

const routes: Routes = [{
  path: '',
  component: UserContainerComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'info'
    },
    {
      path: 'info',
      component: InfoComponent
    },
    {
      path: 'favourites',
      component: FavouritesComponent
    },
    {
      path: 'visited',
      component: VisitedComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
