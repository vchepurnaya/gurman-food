import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from "@angular/forms";

import { Router } from "@angular/router";
import { UserService } from '@app/services';
import { Users } from '@app/shared/mocks';
import { UserDataDefinition } from '@app/shared/interfaces'
@Component({
  selector: 'app-regisration',
  templateUrl: './regisration.component.html',
  styleUrls: ['./regisration.component.scss']
})
export class RegisrationComponent implements OnInit {
  // @Output() registration = new EventEmitter<boolean>();
  logInForm: FormGroup;
  enrty = false;
  succsess = false;
  usersMock: UserDataDefinition[] = Users;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
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
      login: [null, [Validators.required]]
    })
  }

  onLogInSubmit(event: Event) {
    event.preventDefault();

    if (!this.logInForm.valid) {
      return;
    }
    this.succsess = true;
    // this.registration.emit(false);
    this.enrty = true;
  };
}
