import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastDefinition } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
isToastVisible = new BehaviorSubject<ToastDefinition>(null);

  constructor() { }
}
