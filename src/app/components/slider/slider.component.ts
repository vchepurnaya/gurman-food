import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@app/services';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RestaurantsDefinition, RestaurantsResult } from '@app/shared/interfaces';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  nameRestaurants: string = 'Рестораны';
  filter: string = 'Какой-нибудь фильтр';
  restaurants: RestaurantsDefinition;
  private destroy$ = new Subject();


  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getAllRestaurants()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: RestaurantsResult) => {
            this.restaurants = success.content
        },
        error => console.log(error)
      )
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 2
      }
    },
    nav: true
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
