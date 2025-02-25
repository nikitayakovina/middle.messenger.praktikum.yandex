import { v4 as makeUUID } from "uuid";
import EventBus from "./eventBus.ts";
import { renderDom } from "./renderDom.ts";

type EventBusType = { [key: string]: string };
type Meta = { [key: string]: string | object };
export type Events = Record<string, (event: Event) => void>;
export type IProps = { [key: string]: string | Block | Block[] | unknown } & {
  events?: Events;
};

export default class Block {
  static EVENTS: EventBusType = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element!: HTMLElement;

  _meta!: Meta;

  props: IProps;

  _events!: Events;

  _id: string = makeUUID();

  children: Record<string, Block | Block[]>;

  eventBus: () => EventBus;

  constructor(propsAndChildren = {}) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;
    this._meta = {
      props,
    };
    this.props = this._makePropsProxy({ ...props });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: Record<string, Block | Block[] | string>): {
    children: Record<string, Block | Block[]>;
    props: Record<string, Block | Block[] | string>;
  } {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, string | Block | Block[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement("div");
  }

  _init() {
    this._createResources();
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => c.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this.init();
    this._render();
  }

  componentDidUpdate(oldProps: object, newProps: object): boolean {
    if (oldProps && newProps) {
      return true;
    }

    return false;
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element;
  }

  _render() {
    if (this._element) {
      this._removeEvents();

      const propsAndStubs = { ...this.props };

      Object.entries(this.children).forEach(([key, child]) => {
        if (Array.isArray(child)) {
          propsAndStubs[key] = child.map(
            (childComp) => `<div data-id="${childComp._id}"></div>`,
          );
        } else {
          propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        }
      });

      this._element.innerHTML = this.render(propsAndStubs);
      this._element.setAttribute("data-id", this._id);

      Object.values(this.children).forEach((child) => {
        if (Array.isArray(child)) {
          const elements = child.map((comp) =>
            this._element.querySelector(`[data-id="${comp._id}"]`),
          );

          if (
            !elements.length ||
            (elements.length && elements.every((element) => element === null))
          ) {
            return;
          }

          elements.forEach((el, index) => {
            el!.replaceWith(child[index].getContent());
          });
        } else {
          const stub = this._element.querySelector(`[data-id="${child._id}"]`);

          if (stub) {
            stub.replaceWith(child.getContent());
          }
        }
      });

      this._addEvents();
    }
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  compile(template: (data?: IProps) => string, props: IProps): string {
    return template(props);
  }

  protected render(_props: IProps): string {
    return "";
  }

  getContent(): HTMLElement {
    return this._element;
  }

  _makePropsProxy(props: {}): IProps {
    const self = this;

    return new Proxy(props, {
      get(target: { [key: string]: {} }, property: string) {
        const value = target[property];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: { [key: string]: {} }, property: string, value: {}) {
        const newTarget = { ...target };
        /* eslint-disable no-param-reassign */
        target[property] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, newTarget);

        return true;
      },
      deleteProperty() {
        throw new Error("Error deleting");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  show(query: string) {
    this.eventBus().emit(Block.EVENTS.INIT);
    renderDom(query, this);
  }

  hide() {
    this._element.style.display = "none";
  }
}
