import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
export class RestaurantItemComponent implements OnInit, OnDestroy {
  @Input() item: RestaurantsDefinition = null;
  @Input() userdata: UserDataDefinition;
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
    if (this.userdata) {
      this.userEmail = this.userdata.email;
      this.isInFavourites = this.userdata.favorites.includes(this.item.id)
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
        this.isInFavourites = res.content
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

