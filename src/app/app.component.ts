import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, UserService, ToastService, PreloaderService } from '@app/services';
import { RegDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'gurman-food';
  private destroy$ = new Subject();

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private toastService: ToastService,
    private preloaderService: PreloaderService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      this.apiService.getUser(userEmail)
        .pipe(
          finalize(() => this.preloaderService.hide()),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (success: RegDefinition) => {
            this.userService.usersData$.next(success.content)
          },
          ({error}) => {
            this.toastService.toPrintToast(error.code, error.message)
          }
        )
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
