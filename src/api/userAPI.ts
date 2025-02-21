import { BaseAPI } from './baseAPI';

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeUser(data: {}) {
    return this.update('/profile', { data });
  }

  changeAvatar(data: {}) {
    return this.update('/profile/avatar', data);
  }

  changePassword(data: {}) {
    return this.update('/password', data);
  }
}
export default new UserAPI();