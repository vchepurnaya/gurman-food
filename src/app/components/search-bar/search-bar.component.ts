import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition
// ...
} from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        background: 'url(../../../assets/cover.jpg) no-repeat center'
      })),
      state('closed', style({
        background: 'url(../../../assets/cover4.jpg) no-repeat center'
      })),
      transition('open => closed', [
        animate('1s ease-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-out')
      ]),
    ]),
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchtext: string = '';

  constructor() { }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.toggle();
    }, 5000);
  }

}
