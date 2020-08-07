import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService, ToastService, PreloaderService } from '@app/services';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@app/services';
import { RegDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    public dialog: MatDialog,
    private apiService: ApiService,
    private toastService: ToastService,
    private preloaderService: PreloaderService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      login: [null, [ Validators.required ]],
      password: [null,[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)],
      ]
    })
  }

  onSignInSubmit(event: Event) {
    event.preventDefault();

    if (!this.signInForm.valid) {
      return;
    }

    this.apiService.signIn(this.signInForm.value)
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: RegDefinition) => {
          localStorage.setItem('userEmail', success.content.email)

          this.userService.usersData$.next(success.content)
          this.dialog.closeAll();
        },
        ({error}) => this.toastService.toPrintToast(error.code, error.message)
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}


