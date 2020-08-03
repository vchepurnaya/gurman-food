import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@app/services';
import { EntryComponent } from '../entry/entry.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-regisration',
  templateUrl: './regisration.component.html',
  styleUrls: ['./regisration.component.scss']
})
export class RegisrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

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

    const obj = { ...this.registrationForm.value };
    delete obj.confirmPassword;

    this.apiService.signUp(obj)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.dialog.open(EntryComponent);
        },
        error => console.log(error)
      );
  };

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
