import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services';


import { Router } from '@angular/router';
import { UserService } from '@app/services';
import { Users } from '@app/shared/mocks';
import { UserDataDefinition } from '@app/shared/interfaces';


@Component({
  selector: 'app-regisration',
  templateUrl: './regisration.component.html',
  styleUrls: ['./regisration.component.scss']
})
export class RegisrationComponent implements OnInit {
  // @Output() registration = new EventEmitter<boolean>();
  registrationForm: FormGroup;
  succsess = false;
  usersMock: UserDataDefinition[] = Users;
  users: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router,
    private apiService: ApiService
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

    this.apiService.signUp(this.registrationForm.value)
      .subscribe(
        success  => {
          console.log(success)
        },
        error => console.log(error)
      );

    this.succsess = true;
    // this.registration.emit(false);
  };
}
