import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchtext: string = '';
  kitchens: [];

  constructor() {
  }

  ngOnInit(): void {
  }

  encode(kitchen: string): string {
    return encodeURI(kitchen)
  }


  // onKitchenSelect():void {
  //   this.router.navigate(['/restaurants'], {
  //     queryParams: filterValue
  //   });
  // }
}

