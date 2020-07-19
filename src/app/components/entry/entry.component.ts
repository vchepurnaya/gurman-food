import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '@app/services';
import { Users } from '@app/shared/mocks';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  signInForm: FormGroup;
  usersMock: any[] = Users;
  enter = false;

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
        key.email === this. signInForm.value.login) {
        this.userService.users.push(this.usersMock)
        //console.log(this.signInForm.value)
        console.log('yes');
        console.log(this.userService.users)
        this.router.navigate(["/"])
        } else {
          this.enter == true
        console.log('no');
      };
    }
  }
}


