import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '@app/services';
import { Users } from '@app/shared/mocks';
import { UserDataDefinition } from '@app/shared/interfaces';
import { EntryComponent } from '../entry/entry.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import  { RegDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-regisration',
  templateUrl: './regisration.component.html',
  styleUrls: ['./regisration.component.scss']
})
export class RegisrationComponent implements OnInit, OnDestroy {

  // @Output() registration = new EventEmitter<boolean>();
  registrationForm: FormGroup;
  succsess = false;
  usersMock: UserDataDefinition[] = Users;
  users: any[] = [];
  confirmPassword = false;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router,
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
    /*this.userService.user$.subscribe(
      res => console.log(res)
    )*/
    const obj = {...this.registrationForm.value};
    delete obj.confirmPassword;

    this.apiService.signUp(obj)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: RegDefinition) => {
          console.log(success.code, success.message)
          this.toSignIn()
        },
        error => console.log(error)
      );



    /*this.succsess = true;

    if (this.registrationForm.value.password === this.registrationForm.value.confirmPassword){
      this.succsess = true;
      this.confirmPassword = false;


    } else {
      this.confirmPassword = true;*/
    //}
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
