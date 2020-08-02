import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';
import { ActivatedRoute} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RestaurantsDefinition } from '@app/shared/interfaces'


@Component({
  selector: 'app-rest-page',
  templateUrl: './rest-page.component.html',
  styleUrls: ['./rest-page.component.scss']
})
export class RestPageComponent implements OnInit {
  restaurant: RestaurantsDefinition = null;
  id: string;
  iframeSrc: SafeResourceUrl = null;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.apiService.getRestaurantById({id:this.id})
      .subscribe(
        (success: { content: RestaurantsDefinition }) => {
          this.restaurant = success.content;
          this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl('https://yandex.ru/maps-reviews-widget/' + success.content.mapId + '?comments');
        },
        error => console.log(error)
      )
  }
}
