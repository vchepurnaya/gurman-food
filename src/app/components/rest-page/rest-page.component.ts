import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rest-page',
  templateUrl: './rest-page.component.html',
  styleUrls: ['./rest-page.component.scss']
})
export class RestPageComponent implements OnInit {
  id: string;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log(this.id)
  }
}
