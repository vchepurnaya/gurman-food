import { Component, OnInit } from '@angular/core';
import { Restaurants } from '@app/shared/mocks';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  restaurants: any[] = Restaurants;

  kitchen: string[] = ['Русская', 'Итальянская', 'Французская', 'Немецкая', 'Китайская', 'Японская', 'Восточная'];


  constructor(
  ) { }
  
  ngOnInit(): void {
   
  }
}
