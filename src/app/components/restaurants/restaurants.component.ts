import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  kitchen: string[] = ['Русская', 'Итальянская', 'Французская', 'Немецкая', 'Китайская', 'Японская', 'Восточная'];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getAllRestaurants()
      .subscribe(
        (success: { content: any[] }) => {
          this.restaurants = success.content;
        },
        error => console.log(error)
      )
  }
}
