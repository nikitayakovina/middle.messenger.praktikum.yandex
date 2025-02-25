import UserAPI from "../api/userAPI";
import { IPassword, IProfile } from "../models/profile";
import AuthController from "./authController";

class UserController {
  async changeUser(data: IProfile) {
    try {
      await UserAPI.changeUser({...data})
        .then(() => AuthController.getUserInfo())
    } catch (e) {
      console.error(e);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await UserAPI.changeAvatar(data)
        .then(() => AuthController.getUserInfo())
    } catch (e) {
      console.error(e);
    }
  }

  async changePassword(data: IPassword) {
    try {
      await UserAPI.changePassword({...data})
        .then(() => AuthController.getUserInfo())
    } catch (e) {
      console.error(e);
    }
  }
}
export default new UserController();