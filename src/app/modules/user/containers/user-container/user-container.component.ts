import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {
userFirstName = this.userService.usersData$.value.firstName;
userLastName = this.userService.usersData$.value.lastName;
userLogin= this.userService.usersData$.value.login;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
