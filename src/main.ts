import "./style.scss";
import SignIn from "./modules/SignIn/signin.ts";
import Block from "./utils/block.ts";
import Error from "./components/Error/error.ts";
import { renderDom } from "./utils/renderDom.ts";
import Profiles from "./modules/Profiles/profiles.ts";
import Chats from "./modules/Chats/chats.ts";
import SignUp from "./modules/Signup/signup.ts";

const routes: Record<string, Block> = {
  '/': new SignIn(),
  '/signup': new SignUp(),
  '/404': new Error({ code: 404 }),
  '/500': new Error({ code: 500 }),
  '/profiles': new Profiles(),
  '/edit-password': new Profiles(true),
  '/chats': new Chats()
};

document.addEventListener("DOMContentLoaded", () => {
  renderDom('.app', routes[window.location.pathname]);
});
