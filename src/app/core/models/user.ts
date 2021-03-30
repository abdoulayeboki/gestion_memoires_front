export interface User {
  user_id?: number;
  username: string;
  password: string;
  exp?: any;          // la date d'expiration du token
}
