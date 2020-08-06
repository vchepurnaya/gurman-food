import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RestaurantsDefinition } from '@app/shared/interfaces';
import { ApiService, ToastService, UserService } from '@app/services';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PreloaderService } from '@app/services/preloader/preloader.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit, OnDestroy {
  @Input() item: RestaurantsDefinition = null;
  private destroy$ = new Subject();
  userEmail: string = null;


  constructor(
    public userService: UserService,
    private apiService: ApiService,
    private preloaderService: PreloaderService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.userService.usersData$
      .subscribe(res => {
        if (res) {
          this.userEmail = res.email
        }
      })
  }

  setAsFavorite(id: string) {
    this.apiService.setFavouriteRestaurant({
      id,
      userEmail: this.userEmail
    })
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        console.log(res)
      },
        ({error}) => this.toastService.toPrintToast(error.code, error.message)
      )

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }
}

