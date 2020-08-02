import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@app/services';
import { BehaviorSubject } from 'rxjs';
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
  enter = new BehaviorSubject(false);
  private destroy$ = new Subject();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public userService: UserService,
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

          this.userService.usersData$.next(success.content)
          this.enter.next(true);
          this.dialog.closeAll();
        },
        error => {
          console.log(error)
        }
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}


