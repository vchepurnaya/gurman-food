export interface RestaurantsDefinition {
  id: string;
  name: string;
  adress: string;
  phoneNumber: string;
  menuLink: string;
  webSiteUrl: string;
  time: string;
  images: string[];
  kitchen: string[];
}

export interface RestaurantsResult {
  code: string;
  content: RestaurantsDefinition;
}
