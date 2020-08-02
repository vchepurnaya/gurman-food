export interface RestaurantsDefinition {
  id: string,
  name: string,
  address: string,
  phoneNumber: string,
  menuLink: string,
  webSiteUrl: string,
  time: string,
  images: string[],
  kitchen: string[],
  type: string[],
  features: string[],
  mealTime: string[],
  price: string[],
  mapId: string,
}

export interface RestaurantsResult {
  code: string;
  content: RestaurantsDefinition;
}
