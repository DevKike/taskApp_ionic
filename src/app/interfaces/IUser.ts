export interface IUser {
  id: number;
  name: string;
  last_name: string;
  age: number;
  phone_number: number;
  email: string;
  password: string;
  imageUrl?: string;
}

export interface IUserLogin extends Pick<IUser, 'email' | 'password'> {}

export interface IUserUpdate extends Omit<IUser, 'id' | 'email' | 'password'> {}
