import { ISignIn, ISignUp } from "../models/auth.ts";
import { IUser } from "../models/user.ts";
import { BaseAPI } from "./baseAPI.ts";

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signIn(data: ISignIn) {
    return this.create("/signin", data);
  }

  signUp(data: ISignUp) {
    return this.create("/signup", data);
  }

  logOut() {
    return this.create("/logout", {});
  }

  userInfo() {
    return this.request<IUser>("/user");
  }
}
export default new AuthAPI();
