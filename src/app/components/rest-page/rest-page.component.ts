import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, PreloaderService, ToastService } from '@app/services';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RestaurantsDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-rest-page',
  templateUrl: './rest-page.component.html',
  styleUrls: ['./rest-page.component.scss']
})
export class RestPageComponent implements OnInit, OnDestroy {
  restaurant: RestaurantsDefinition = null;
  id: string;
  iframeSrc: SafeResourceUrl = null;
  private destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private toastService: ToastService,
    private preloaderService: PreloaderService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.apiService.getRestaurantById({id: this.id})
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: { content: RestaurantsDefinition }) => {
          this.restaurant = success.content;
          this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl('https://yandex.ru/maps-reviews-widget/' + success.content.mapId + '?comments');
        },
        ({error}) => {
          this.toastService.toPrintToast(error.code, error.message)
        }
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
