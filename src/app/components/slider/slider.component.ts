import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  nameRestaurants: string = 'Рестораны';
  kitchen: string[] = ['Русская', 'Итальянская', 'Французская', 'Немецкая', 'Китайская', 'Японская', 'Восточная'];

  restaurants: any[] = [];

  constructor(
    private apiService: ApiService,
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
