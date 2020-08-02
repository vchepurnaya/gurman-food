import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RestaurantsDefinition } from '@app/shared/interfaces'

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  restaurants: RestaurantsDefinition[] = [];
  kitchen: string[] = ['Русская', 'Итальянская', 'Французская', 'Немецкая', 'Китайская', 'Японская', 'Восточная'];
  type: string[] = ['Рестораны', 'Быстрые перекусы', 'Чай и кофе', 'Булочные', 'Бар и клубы', 'Только доставка'];
  features: string[] = ['Доставка', 'Еда на вынос', 'Бронирование', 'Банкет', 'Живая музыка', 'Только доставка', 'Подают алкоголь', 'Рестораны для некурящих', 'Столик на открытом воздухе'];
  mealTime: string[] = ['Завтрак', 'Бранч', 'Обед', 'Ужин'];
  price: string[] = ['Вкусно и недорого', 'По умеренной цене', 'Ретсораны высокой кухни'];
  shoes = [];
  private destroy$ = new Subject();


  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {

    this.apiService.getAllRestaurants()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: { content: RestaurantsDefinition[] }) => {
          this.restaurants = success.content;
        },
        error => console.log(error)
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
