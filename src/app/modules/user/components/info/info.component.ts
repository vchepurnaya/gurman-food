import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  userFirstName = this.userService.usersData$.value.firstName;
  userLastName = this.userService.usersData$.value.lastName;
  userEmail = this.userService.usersData$.value.email;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
