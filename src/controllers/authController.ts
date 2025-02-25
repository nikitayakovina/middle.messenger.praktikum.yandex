import AuthAPI from "../api/authAPI.ts";
import { ISignIn, ISignUp } from "../models/auth.ts";
import { RouterPath } from "../models/router.ts";
import { StoreEnum } from "../models/store.ts";
import { BASE_URL_RESOURCE } from "../utils/HTTPTransport";
import Router from "../utils/router.ts";
import Store from "../utils/store.ts";
import ChatsController from "./chatsController.ts";

class AuthController {
  async signIn(data: ISignIn) {
    try {
      await AuthAPI.signIn(data)
        .then(() => {
          ChatsController.getChats();
        })
        .then(() => this.getUserInfo())
        .then(() => {
          Router.go(RouterPath.MESSENGER);
        });
    } catch (e) {
      console.error(e);
    }
  }

  async signUp(data: ISignUp) {
    try {
      await AuthAPI.signUp(data)
        .then(() => this.getUserInfo())  
        .then(() => {
          Router.go(RouterPath.MESSENGER)
        });
    } catch (e) {
      console.error(e);
    }
  }

  async logOut() {
    try {
      await AuthAPI.logOut().then(() => {
        Store.clearState();
        Router.go(RouterPath.HOME)
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getUserInfo() {
    try {
      await AuthAPI.userInfo().then((data) => {
        Store.set(StoreEnum.USER, { ...data, avatar: BASE_URL_RESOURCE + data?.avatar });
      });
    } catch (e) {
      console.error(e);
    }
  }
}
export default new AuthController();
