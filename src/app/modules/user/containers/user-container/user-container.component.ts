import { Component, OnInit } from '@angular/core';
import { UserDataDefinition } from '@app/shared/interfaces';
import { UserService } from '@app/services';
import { Users } from '@app/shared/mocks';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  usersMock: UserDataDefinition[] = Users;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void { 
  }

}
