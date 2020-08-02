import { Component, OnInit } from '@angular/core';
import { ApiService, UserService } from '@app/services';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'gurman-food';

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      this.apiService.getUser(userEmail)
        .subscribe(
          success => {
            console.log(success)
          },
          error => {
            console.log(error)
          }
        )
    }
  }
}

