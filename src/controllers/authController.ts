import AuthAPI from "../api/authAPI";
import Router from "../utils/router";
import Store from "../utils/store";
import ChatsController from "./chatsController";

class AuthController {
  async signIn(data: {}) {
    try {
      await AuthAPI.signIn(data)
        .then(() => {
          ChatsController.getChats();
        })
        .then(() => this.getUserInfo())
        .then(() => {
          Router.go('/messenger');
        });
    } catch (e) {
      console.error(e);
    }
  }

  async signUp(data: {}) {
    try {
      await AuthAPI.signUp(data).then(() => {
        Router.go('/messenger')
      });
    } catch (e) {
      console.error(e);
    }
  }

  async logOut() {
    try {
      await AuthAPI.logOut().then(() => {
        Store.clearState();
        Router.go('/')
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getUserInfo() {
    try {
      await AuthAPI.userInfo().then((data: any) => {
        Store.set("user", data);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
export default new AuthController();