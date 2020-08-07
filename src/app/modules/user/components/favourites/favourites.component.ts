import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  restaurants: RestaurantsDefinition[] = [];
  userData: UserDataDefinition;

  constructor(
    private apiService: ApiService,
    private preloaderService: PreloaderService,
    private toastService: ToastService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.usersData$
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      this.userData = res
      this.restaurants = this.restaurants.filter(restaurant => res.favorites.includes(restaurant.id));
    });

    this.apiService.getFavouriteRestaurants({
      userEmail: this.userService.usersData$.value.email
    })
    .pipe(
      finalize(() => this.preloaderService.hide()),
      takeUntil(this.destroy$)
    )
    .subscribe(
      (success: { content: RestaurantsDefinition[] }) => this.restaurants = success.content,
      ({error}) => this.toastService.toPrintToast(error.code, error.message)
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
