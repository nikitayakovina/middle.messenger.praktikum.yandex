import SignIn from "./modules/SignIn/signin";
import Block from "./utils/block";
import Chats from "./modules/Chats/chats";
import SignUp from "./modules/Signup/signup";
import { renderDom } from "./utils/renderDom";
import Profiles from "./modules/Profiles/profiles";
import Error from "./components/Error/error";

export default class App {
  private pages: Record<string, Block> = {
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

  constructor() {}

  public init(): void {
    renderDom(".app", this.pages.chats);
  }
}
