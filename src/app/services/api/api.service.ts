import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  env = environment;

  constructor(
    private httpClient: HttpClient
  ) {}

  signUp(body: {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/sign-up', body);
  }

  signIn(body: {
    email: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/sign-in', body);
  }

  getUser(params: {
    email: string;
  }) {
    return this.httpClient.get(this.env.apiUrl + 'api/user', { params });
  }

  getAllRestaurants() {
    return this.httpClient.get(this.env.apiUrl + 'api/restaurants');
  }
}
