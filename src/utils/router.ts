import { RouterPath } from "../models/router.ts";
import Block from "./block.ts";
import Route from "./route.ts";
import Store from "./store.ts";

class Router {
  routes: Route[] = [];

  _rootQuery: string = "";

  _currentRoute: Route|null = null;

  static _instance: Router;
  
  history = window.history;

  constructor(rootQuery: string = ".app") {
    if (Router._instance) {
        return Router._instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router._instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    const { user } = Store.getState();

    if (!route) {
      this.go(RouterPath.ERROR_404);
      return;
    }

    if (pathname !== RouterPath.HOME && pathname !== RouterPath.SIGN_UP && !user) {
      this.go(RouterPath.HOME);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute = (pathname: string) =>
    this.routes.find(route => route.match(pathname))
}
export default new Router(".app");
