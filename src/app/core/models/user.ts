import { Personnel } from "src/app/administration/models/personnel";

export interface User {
  id?: number;
  username: string;
  password: string;
  personnel?: Personnel;
  exp?: any;          // la date d'expiration du token
}
