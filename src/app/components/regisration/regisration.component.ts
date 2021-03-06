import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, ToastService, PreloaderService } from '@app/services';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntryComponent } from '@app/components/entry/entry.component';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { RegDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-regisration',
  templateUrl: './regisration.component.html',
  styleUrls: ['./regisration.component.scss']
})
export class RegisrationComponent implements OnInit, OnDestroy {

  registrationForm: FormGroup;
  confirmPassword = false;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
    public toastService: ToastService,
    private preloaderService: PreloaderService
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: [null, [
        Validators.required,
        Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      login: [null, [Validators.required]],
    })
  }

  onRegistrationSubmit(event: Event) {
    event.preventDefault();

    if (!this.registrationForm.valid) {
      return;
    }

    const obj = {...this.registrationForm.value};
    delete obj.confirmPassword;

    this.preloaderService.show()
    this.apiService.signUp(obj)
      .pipe(
        finalize(() => this.preloaderService.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: RegDefinition) => {
          this.toastService.toPrintToast(success.code, success.message)
          this.toSignIn()
        },
        ({error}) => {
          this.toastService.toPrintToast(error.code, error.message)
        }
      );
  };

  toSignIn(): void {
    this.dialog.closeAll();
    this.dialog.open(EntryComponent);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
