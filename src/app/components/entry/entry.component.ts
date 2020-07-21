import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@app/services';
import { Users } from '@app/shared/mocks';
import { BehaviorSubject } from 'rxjs';
import { UserDataDefinition } from '@app/shared/interfaces'

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  signInForm: FormGroup;
  usersMock: UserDataDefinition[] = Users;
  enter = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      login: [null],
      password: [null]
    })
  }

  onSignInSubmit(event: Event) {
    event.preventDefault();


    for(let key of this.usersMock) {
      if(key.password === this.signInForm.value.password &&
        key.email === this.signInForm.value.login) {
        this.userService.users = {
          data: this.signInForm.value
        } 
        console.log('yes');
        console.log(this.userService.users);
        this.enter.next(false);
        } else {
          this.enter.next(true);
          console.log('no');
        };
    }
  }
}


