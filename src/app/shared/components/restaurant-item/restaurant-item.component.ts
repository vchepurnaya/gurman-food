import { Component, OnInit, Input } from '@angular/core';
import { RestaurantsDefinition } from '@app/shared/interfaces';
import { UserService } from '@app/services';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit {
  @Input() item: RestaurantsDefinition = null;

  constructor(
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
  }
}

