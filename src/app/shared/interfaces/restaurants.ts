export interface RestaurantsDefinition {
  id: string,
  name: string,
  adress: string,
  phoneNumber: string,
  menuLink: string,
  webSiteUrl: string,
  time: string,
  img: string[],
  kitchen: string[]
}

export interface RestaurantsResult {
  restaurants: RestaurantsDefinition[]
}
