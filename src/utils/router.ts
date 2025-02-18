import Block from "./block";
import Route from "./route";

export default class Router {
  routes: Route[] = [];
  _rootQuery: string = "";
  _currentRoute: Route|null = null;
  static _instance: Router;
  history = window.history;

  constructor(rootQuery: string) {
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
    window.onpopstate = ((event: any) => {
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
      const route = this.getRoute(pathname);

      if (!route) {
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

  getRoute(pathname: string) {
      return this.routes.find(route => route.match(pathname));
  }
}