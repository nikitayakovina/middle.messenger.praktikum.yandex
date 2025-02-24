import { ISignIn, ISignUp } from '../models/auth';
import { IUser } from '../models/user';
import { BaseAPI } from './baseAPI';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signIn(data: ISignIn) {
    return this.create('/signin', data);
  }

  signUp(data: ISignUp) {
    return this.create('/signup', data);
  }

  logOut() {
    return this.create('/logout', {});
  }

  userInfo() {
    return this.request<IUser>('/user');
  }
}
export default new AuthAPI();