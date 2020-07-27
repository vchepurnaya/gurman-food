import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services';
import {MatDialog} from '@angular/material/dialog';


import { Router } from '@angular/router';
import { UserService } from '@app/services';
import { Users } from '@app/shared/mocks';
import { UserDataDefinition } from '@app/shared/interfaces';
import {EntryComponent} from "../entry/entry.component";

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
  confirmPassword = false;

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

    this.apiService.signUp(this.registrationForm.value)
      .subscribe(
        success  => {
          console.log(success)
        },
        error => console.log(error)
      );

    this.succsess = true;
    
    if (this.registrationForm.value.password === this.registrationForm.value.confirmPassword){
      this.succsess = true;
      this.confirmPassword = false;
      this.dialog.closeAll();
      this.dialog.open(EntryComponent);
    } else {
      this.confirmPassword = true;
    }
  };
}
