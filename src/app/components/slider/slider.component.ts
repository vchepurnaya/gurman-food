import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RestaurantsDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  nameRestaurants: string = 'Лучшие рестораны Минска';
  restaurants: RestaurantsDefinition[] = [];
  filter: string = 'Какой-нибудь фильтр';

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getAllRestaurants()
      .subscribe(
        (success: { content: RestaurantsDefinition[] }) => {
          this.restaurants = success.content;
          console.log(success.content);
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
        items: 3
      }
    },
    nav: true
  }
}
