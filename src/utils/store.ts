import { StoreEnum } from "../models/store";
import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated"
}
enum StoreName {
  STORE = "store"
}
export type StoreType = Partial<{[K in StoreEnum]: unknown}>;

class Store extends EventBus {
  _state: StoreType;

  constructor() {
    super();

    const state = localStorage.getItem(StoreName.STORE);

    this._state = state !== null? JSON.parse(state) : {};
    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(StoreName.STORE, JSON.stringify(this._state));
    });
  }

  set(path: StoreEnum, value: unknown) {
    this._state[path] = value;
    this.emit(StoreEvents.Updated);
    return this;
  }

  getState(): StoreType {
    return this._state;
  }

  clearState() {
    this._state = {};
    localStorage.clear();
    this.emit(StoreEvents.Updated);
  }
}
export default new Store();