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
    password: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/sign-in', body);
  }

  getUser(email: string) {
    return this.httpClient.get(this.env.apiUrl + 'api/user', { params: {email} });
  }

  getRestaurantById(params: {
    id: string
  }) {
    return this.httpClient.get(this.env.apiUrl + 'api/restaurants', { params });
  }

  getAllRestaurants() {
    return this.httpClient.get(this.env.apiUrl + 'api/restaurants');
  }

  getFilteredRestaurants(body: {
    feature?: string[];
    kitchen?: string[];
    type?: string[];
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/restaurants/filter', body)
  }

  setFavouriteRestaurant(body: {
    id: string;
    userEmail: string;
  }) {
    return this.httpClient.post(this.env.apiUrl + 'api/user/favorites', body)
  }

  getFavouriteRestaurants(params: {
    userEmail: string
  }){
    return this.httpClient.get(this.env.apiUrl + 'api/user/favorites', { params });
  }
}
