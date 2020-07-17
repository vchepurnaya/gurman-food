import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-regisration',
  templateUrl: './regisration.component.html',
  styleUrls: ['./regisration.component.scss']
})
export class RegisrationComponent implements OnInit {
  logInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: [null],
      password: [null],
      firstName: [null],
      lastName: [null],
      confirmPassword: [null]
    })
  }

  onLogInSubmit(event: Event) {
    event.preventDefault();
  }
}
