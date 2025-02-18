import "./style.scss";
import SignIn from "./modules/SignIn/signin.ts";
import Error from "./components/Error/error.ts";
import Profiles from "./modules/Profiles/profiles.ts";
import Chats from "./modules/Chats/chats.ts";
import SignUp from "./modules/Signup/signup.ts";
import Router from "./utils/router.ts";

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router(".app");

  router
    .use('/', SignIn)
    .use('/sign-up', SignUp)
    // .use('/404', Error)
    // .use('/500', Error)
    .use('/settings', Profiles)
    .use('/messenger', Chats)
    .start();
});
