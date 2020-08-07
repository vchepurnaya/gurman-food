import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService, PreloaderService, ToastService } from '@app/services';
import { RestaurantsDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  restaurants: RestaurantsDefinition[] = [];
  kitchen: string[] = [
    'Русская',
    'Итальянская',
    'Французская',
    'Немецкая',
    'Китайская', 
    'Японская',
    'Восточная'
  ];
  type: string[] = [
    'Рестораны',
    'Быстрые перекусы',
    'Чай и кофе',
    'Булочные',
    'Бары и клубы',
    'Только доставка'
  ];
  features: string[] = [
    'Доставка',
    'Еда на вынос',
    'Бронирование',
    'Банкет',
    'Живая музыка',
    'Подают алкоголь',
    'Рестораны для некурящих',
    'Столик на открытом воздухе'
  ];
  filters = {
    kitchen: [],
    type: [],
    features: []
  };
  private destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private preloaderService: PreloaderService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        this.preloaderService.show();
        const keys: string[] = Object.keys(res);

        if (keys.length) {
          const filterValue = keys.reduce((acc, item) => {
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

      if (this.filters[item].length) {
        const encodedParam: string = encodeURI(this.filters[item].join(','));

        acc[item] = encodedParam;
      }

      return acc;
    }, {});

    this.router.navigate(['/restaurants'], {
      queryParams: filterValue
    });
  }

  getAllRestaurants(): void {
    this.apiService.getAllRestaurants()
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: { content: RestaurantsDefinition[] }) => this.restaurants = success.content,
        ({ error }) => this.toastService.toPrintToast(error.code, error.message)
      )
  }

  getFilteredRestaurants(body: {
    feature?: string[];
    kitchen?: string[];
    type?: string[];
  }): void {
    this.apiService.getFilteredRestaurants(body)
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: { content: RestaurantsDefinition[] }) => this.restaurants = success.content,
        ({ error }) => this.toastService.toPrintToast(error.code, error.message)
      )
  }

  openFilters():void {
    const btnOpen = document.querySelector('.b-rest__side-bar');
    btnOpen.classList.toggle('_open')
  }

  closeFilters($event): void {
    const btnMenu = document.querySelector('.b-rest__side-bar');

    if($event.target.classList.contains('b-rest__side-bar')){
      btnMenu.classList.remove('_open')
    }
  }
}
