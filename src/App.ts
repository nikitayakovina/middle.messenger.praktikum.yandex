import SignIn from "./modules/SignIn/signin";
import Chats from "./modules/Chats/chats";
import NotFound from "./modules/NotFound/notFound";
import Profile from "./modules/Profile/profile";
import SignUp from "./modules/Signup/signup";
import AbstractClass from "./modules/abstract";

export default class App {
    private appTemplate: HTMLElement = document.getElementById('app');
    private pages: Record<string, AbstractClass> = {
        redirectSignIn: new SignIn(this.appTemplate),
        redirectSignUp: new SignUp(this.appTemplate),
        chats: new Chats(this.appTemplate),
        profile: new Profile(this.appTemplate),
        notFound500: new NotFound(this.appTemplate),
        notFound404: new NotFound(this.appTemplate, '404')
    };

    constructor() {}

    public init(): void {
        this.pages.redirectSignIn.render();

        window.addEventListener('navigate', (event: Event) => {
            // @ts-ignore
            const page = event.detail.page;

            if (!this.pages[page]) {
                this.pages.notFound404.render();

                return;
            }
            
            this.pages[page].render();
        });
    }
}
