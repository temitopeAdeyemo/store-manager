import ICreateUser from './ICreateUserDTO';

export default interface IUser extends ICreateUser {
  authorization_token: string;
  email_verified?: boolean;
  _id?: string | Object;
}
