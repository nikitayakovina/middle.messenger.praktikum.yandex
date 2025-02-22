import UserAPI from "../api/userAPI";
import AuthController from "./authController";

class UserController {
  async changeUser(data: {}) {
    try {
      await UserAPI.changeUser(data)
        .then(() => AuthController.getUserInfo())
    } catch (e) {
      console.error(e);
    }
  }

  async changeAvatar(data: {}) {
    try {
      await UserAPI.changeAvatar({data})
        .then(() => AuthController.getUserInfo())
    } catch (e) {
      console.error(e);
    }
  }

  async changePassword(data: {}) {
    try {
      await UserAPI.changePassword({data})
        .then(() => AuthController.getUserInfo())
    } catch (e) {
      console.error(e);
    }
  }
}
export default new UserController();