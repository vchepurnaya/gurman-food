import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { RestaurantsDefinition, UserDataDefinition } from '@app/shared/interfaces';
import {
  ApiService,
  ToastService,
  UserService,
  PreloaderService
} from '@app/services';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: RestaurantsDefinition = null;
  @Input() userData: UserDataDefinition;
  userEmail: string = null;
  isInFavourites = false;
  private destroy$ = new Subject();

  constructor(
    public userService: UserService,
    private apiService: ApiService,
    private preloaderService: PreloaderService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    const userData = changes.userData.currentValue;

    if (userData) {
      this.userEmail = userData.email;
      this.isInFavourites = userData.favorites.includes(this.item.id)
    }
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
      .subscribe((res: { code: number, message: string; content: boolean; }) => {
        if (res.content) {
          this.userData.favorites.push(id);
        } else {
          this.userData.favorites =
            this.userData.favorites.filter(favId => favId !== id);
        }

        this.userService.usersData$.next({...this.userData});
        this.toastService.toPrintToast(res.code, res.message)
      },
        ({error}) => this.toastService.toPrintToast(error.code, error.message)
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete()
  }
}

