import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RestaurantsDefinition } from '@app/shared/interfaces';
import { ApiService } from '@app/services';
import { PreloaderService } from '@app/services/preloader/preloader.service';
import { ToastService } from '@app/services';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  restaurants: RestaurantsDefinition[] = [];

  constructor(
    private apiService: ApiService,
    private preloaderService: PreloaderService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
      this.apiService.getAllRestaurants()
        .pipe(
          finalize(() => this.preloaderService.hide()),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (success: { content: RestaurantsDefinition[] }) => this.restaurants = success.content.slice(0,5),
          ({error}) => this.toastService.toPrintToast(error.code, error.message)
        )
    }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
