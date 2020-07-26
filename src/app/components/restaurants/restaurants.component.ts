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
  type: string[] = ['Рестораны', 'Быстрые перекусы', 'Чай и кофе', 'Булочные', 'Бар и клубы', 'Только доставка'];
  features: string[] = ['Доставка', 'Еда на вынос', 'Бронирование', 'Банкет', 'Живая музыка', 'Только доставка', 'Подают алкоголь', 'Рестораны для некурящих', 'Столик на открытом воздухе'];
  mealTime: string[] = ['Завтрак', 'Бранч', 'Обед', 'Ужин'];
  price: string[] = ['Вкусно и недорого', 'По умеренной цене', 'Ретсораны высокой кухни'];


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
