import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDataDefinition } from '@app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersData$ = new BehaviorSubject<UserDataDefinition>(null)

  constructor() {}
}
