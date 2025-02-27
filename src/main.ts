import "./style.scss";
import SignIn from "./modules/SignIn/signin.ts";
import Profiles from "./modules/Profiles/profiles.ts";
import Chats from "./modules/Chats/chats.ts";
import SignUp from "./modules/Signup/signup.ts";
import Router from "./utils/router.ts";
import Error404 from "./modules/Error404/error404.ts";
import Error500 from "./modules/Error500/error500.ts";
import { RouterPath } from "./models/router.ts";
import AuthController from "./controllers/authController.ts";
import ChatsController from "./controllers/chatsController.ts";

document.addEventListener("DOMContentLoaded", () => {
  Router.use(RouterPath.HOME, SignIn)
    .use(RouterPath.SIGN_UP, SignUp)
    .use(RouterPath.ERROR_404, Error404)
    .use(RouterPath.ERROR_500, Error500)
    .use(RouterPath.SETTINGS, Profiles)
    .use(RouterPath.MESSENGER, Chats);
  AuthController.getUserInfo()
    .then(() => ChatsController.getChats())
    .then(() => Router.start());
});
