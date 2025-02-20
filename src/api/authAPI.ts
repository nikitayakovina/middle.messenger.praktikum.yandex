import { BaseAPI } from './baseAPI';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signIn(data: {}) {
    return this.create('/signin', data);
  }

  signUp(data: {}) {
    return this.create('/signup', data);
  }

  logOut() {
    return this.create('/logout', {});
  }

  userInfo() {
    return this.request('/user');
  }
}
export default new AuthAPI();