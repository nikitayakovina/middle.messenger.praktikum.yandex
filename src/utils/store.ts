import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated"
}
const storeName = "store";

class Store extends EventBus {
  _state: { [key: string]: unknown } = {};

  constructor() {
    super();

    const state = localStorage.getItem(storeName);

    this._state = state !== null? JSON.parse(state) : {};
    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(storeName, JSON.stringify(this._state));
    });
  }

  set(path: string, value: unknown) {
    this._state[path] = value;
    this.emit(StoreEvents.Updated);
    return this;
  }

  getState() {
    return this._state;
  }

  clearState() {
    this._state = {};
    localStorage.clear();
    this.emit(StoreEvents.Updated);
  }
}
export default new Store();