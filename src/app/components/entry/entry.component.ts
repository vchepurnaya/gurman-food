import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      login: [null],
      password: [null]
    })
  }

  onSignInSubmit(event: Event) {
    event.preventDefault();
  }
}


