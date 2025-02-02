import SignIn from "./modules/SignIn/signin.ts";
import Block from "./utils/block.ts";
import Chats from "./modules/Chats/chats.ts";
import SignUp from "./modules/Signup/signup.ts";
import { renderDom } from "./utils/renderDom.ts";
import Profiles from "./modules/Profiles/profiles.ts";
import Error from "./components/Error/error.ts";

export default class App {
  _pages: Record<string, Block> = {
    redirectSignIn: new SignIn(),
    redirectSignUp: new SignUp(),
    chats: new Chats(),
    profiles: new Profiles(),
    notFound500: new Error({
      code: "500",
    }),
    notFound404: new Error({
      code: "404",
    }),
  };

  constructor() {
    //данный функционал будет удален
    window.addEventListener("navigate", (event: Event) => {
      //@ts-expect-error
      const { page } = event.detail;
      renderDom(".app", this._pages[page]);
    });
  }

  init() {
    renderDom(".app", this._pages.chats);
  }
}
