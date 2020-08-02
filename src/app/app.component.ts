import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, UserService } from '@app/services';
import { RegDefinition } from '@app/shared/interfaces';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      this.apiService.getUser(userEmail)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          (success:RegDefinition) => {
            console.log(success)
            this.userService.usersData$.next(success.content)

          },
          error => {
            console.log(error)
          }
        )
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
