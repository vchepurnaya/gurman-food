export interface UserDataDefinition {
  code: number;
  message: string;
  content: {
    firstName: string;
    lastName: string;
    id: string;
    login: string;
    email: string;
  }
}
