import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  kitchen: string[] = ['Русская', 'Итальянская', 'Французская', 'Немецкая', 'Китайская', 'Японская', 'Восточная'];


  constructor(
  ) { }
  
  ngOnInit(): void {
  }
}
