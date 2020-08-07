export interface RegDefinition {
  code: number;
  message: string;
  content: {
    firstName: string;
    lastName: string;
    id: string;
    login: string;
    email: string;
    favorites: string[];
  }
}



