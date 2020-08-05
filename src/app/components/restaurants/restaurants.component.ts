import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '@app/services';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { RestaurantsDefinition } from '@app/shared/interfaces';
import { ToastService } from '@app/services/toast/toast.service';
import { PreloaderService } from '@app/services/preloader/preloader.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  restaurants: RestaurantsDefinition[] = [];
  kitchen: string[] = ['Русская', 'Итальянская', 'Французская', 'Немецкая', 'Китайская', 'Японская', 'Восточная'];
  type: string[] = ['Рестораны', 'Быстрые перекусы', 'Чай и кофе', 'Булочные', 'Бары и клубы', 'Только доставка'];
  features: string[] = ['Доставка', 'Еда на вынос', 'Бронирование', 'Банкет', 'Живая музыка', 'Подают алкоголь', 'Рестораны для некурящих', 'Столик на открытом воздухе'];
  private destroy$ = new Subject();
  filters = {
    kitchen: [],
    type: [],
    features: []
  }

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private  preloaderService: PreloaderService
  ) {
  }

  ngOnInit(): void {
    this.preloaderService.show()
    this.activatedRoute.queryParams
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$),
      )
      .subscribe(
        res=> {
          const keys: string[] = Object.keys(res);

          if(keys.length) {
            const filterValue = keys.reduce((acc, item)=>{
              const decodedParam: string[] = decodeURI(res[item]).split(',');

              acc[item] = decodedParam;

              return acc;
            }, {});

            this.filters = {
              ...this.filters,
              ...filterValue
            }

            this.getFilteredRestaurants(filterValue);

          } else {
            this.getAllRestaurants();
          }
        }
    )
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onFilerChange(): void {
    const keys = Object.keys(this.filters)
    const filterValue = keys.reduce((acc, item) => {

      if(this.filters[item].length){
        const encodedParam: string = encodeURI(this.filters[item].join(','));

        acc[item] = encodedParam;
      }

      return acc;
    }, {});

    this.router.navigate(['/restaurants'], {
      queryParams: filterValue
    });
  }

  getAllRestaurants():void {
    this.apiService.getAllRestaurants()
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: { content: RestaurantsDefinition[] }) => this.restaurants = success.content,
        ({error}) => this.toastService.toPrintToast(error.code, error.message)
      )
  }

  getFilteredRestaurants(body: {}):void {
      this.apiService.getFilteredRestaurants(body)
        .pipe(
          finalize(() => this.preloaderService.hide()),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (success: { content: RestaurantsDefinition[] }) => this.restaurants = success.content,
          ({error}) => this.toastService.toPrintToast(error.code, error.message)
        )
  }
}
