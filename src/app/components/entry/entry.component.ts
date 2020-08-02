import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService, EntryService } from '@app/services';
import { Users } from '@app/shared/mocks';
import { BehaviorSubject } from 'rxjs';
import { UserDataDefinition } from '@app/shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@app/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RegDefinition } from '@app/shared/interfaces';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  usersMock: UserDataDefinition[] = Users;
  enter = new BehaviorSubject(false);
  private destroy$ = new Subject();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public userService: UserService,
    public entrySerivce: EntryService,
    public dialog: MatDialog,
    private apiService: ApiService
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
        takeUntil(this.destroy$)
      )
      .subscribe(
        (success: RegDefinition) => {
          localStorage.setItem('userEmail', success.content.email)
          console.log(success.content)

          //this.userService.usersData$ = success.content.email

          if (localStorage.getItem('userEmail')) {
            this.apiService.getUser(this.signInForm.value.email)
              .subscribe(
                success => {
                  console.log(success)
                },
                error => {
                  console.log(error)
                }
              )
          } else {
            return;
          }
        },
        error => {
          console.log(error)
        }
      )
  }

  toSignUp(): void {
    for (let key of this.usersMock) {
      if (key.password === this.signInForm.value.password &&
        key.email === this.signInForm.value.login) {
        this.userService.users = {
          data: this.signInForm.value
        }
        this.entrySerivce.entryHidden.next(true)
        this.enter.next(false);
        this.dialog.closeAll();

      } else {
        this.enter.next(true);
      };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}


