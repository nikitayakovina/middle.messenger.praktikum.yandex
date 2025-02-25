import { IProfile } from '../models/profile';
import { BaseAPI } from './baseAPI';

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeUser(data: IProfile) {
    return this.update('/profile', { ...data });
  }

  changeAvatar(data: FormData) {
    return this.update('/profile/avatar', data);
  }

  changePassword(data: {}) {
    return this.update('/password', data);
  }
}
export default new UserAPI();
