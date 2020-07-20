import { Component, OnInit } from '@angular/core';
import { UserDataDefinition } from '@app/shared/interfaces';
import { UserService } from '@app/services';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
