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
    // не нужно типизировать
    // тк код будет удален в следующем спринте и нужен только для отладки страниц
    window.addEventListener('navigate', (event: any) => {
      const page = event.detail.page;

      if (this._pages[page]) {
          renderDom(".app", this._pages[page]);
      }
    });
  }

  init() {
    renderDom(".app", this._pages.chats);
  }
}
