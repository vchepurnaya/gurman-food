import { Component, OnInit } from '@angular/core';
import { restaurants } from './restaurants.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  restaurantsArray = restaurants;

  constructor() { }

  ngOnInit(): void {
  }
}
