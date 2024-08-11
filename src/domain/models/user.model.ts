import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string
  ) {}
}