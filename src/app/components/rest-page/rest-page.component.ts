import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { HttpClient }  from '@angular/common/http';

@Component({
  selector: 'app-rest-page',
  templateUrl: './rest-page.component.html',
  styleUrls: ['./rest-page.component.scss']
})
export class RestPageComponent implements OnInit {
  id: number;

  constructor(
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private subscription: Subscription,
    private httpClient: HttpClient,
  ) { 
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
   }

  ngOnInit(): void {
  
  }

}
