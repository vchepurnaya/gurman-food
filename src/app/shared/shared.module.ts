import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantItemComponent } from './components/restaurant-item/restaurant-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RestaurantItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [RestaurantItemComponent]
})
export class SharedModule { }
