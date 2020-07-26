import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  entryHidden = new BehaviorSubject(false);

  constructor() { }
}
