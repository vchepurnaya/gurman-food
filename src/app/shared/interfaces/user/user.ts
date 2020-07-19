
export interface UserDataDefinition {
  data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
}

export interface UserResDefinition {
  results: UserDataDefinition[];
}