import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  isPreloaderState$ = new Subject<boolean>();

  constructor() { }

  show() {
    this.isPreloaderState$.next(true);
  }
  hide() {
    this.isPreloaderState$.next(false);
  }
}

