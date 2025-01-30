import EventBus from "./eventBus";
import Handlebars from "handlebars"
import { renderDom } from "./renderDom";
import {v4 as makeUUID} from 'uuid';

type EventBusType = { [key: string]: string };
type Meta = { [key: string]: string | object };
export type Events = Record<string, (event: Event) => void>;

interface IProps {
    events?: any;
    // attr?: Attributes | false;
    // template?: string;
};

export default class Block {
  static EVENTS: EventBusType = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element!: HTMLElement
  _meta!: Meta;
  props: IProps;
  _events!: Events;
  _id: string = makeUUID();
  children: any;

  eventBus: () => EventBus;
  
  constructor(propsAndChildren = {},  ) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    // console.log('------------')
    // console.log(this)
    // console.log('children',children)
    // console.log('props',props)

    this.children = children;
    this._meta = {
      props
    };
    // this._events = events;
    this.props = this._makePropsProxy({ ...props });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};
  
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
  
    return { children, props };
  }
  
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }
  
  _createResources(): void {
    this._element = this._createDocumentElement('div');
  }
  
  _init(): void {
    this._createResources();
    this.init();
    this._render();
  }

  init() {}
  
  _componentDidMount(): void {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  
  componentDidMount() {}
  
  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }
  
  _componentDidUpdate(oldProps: {}, newProps: {}) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
        return;
    }

    this.init();
    this._render();
  }
  
  componentDidUpdate(oldProps: {}, newProps: {}): boolean {
    // return JSON.stringify(oldProps) !== JSON.stringify(newProps);
    return true;
  }
  
  setProps = (nextProps: {}) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };
  
  get element(): HTMLElement {
    return this._element;
  }

  _render(): void {
    if (this._element) {
        this._removeEvents();

        const propsAndStubs = { ...this.props };

        Object.entries(this.children).forEach(([key, child]) => {
          if (Array.isArray(child)) {
            //@ts-ignore
            propsAndStubs[key] = child.map((childComp) => `<div data-id="${childComp._id}"></div>`);
          } else {
            //@ts-ignore
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
          }
        });

        //@ts-ignore
        this._element.innerHTML = this.render(propsAndStubs);
        this._element.setAttribute('data-id', this._id);

        Object.values(this.children).forEach(child => {
          if (Array.isArray(child)) {
            const elements = child.map((comp) => this._element.querySelector(`[data-id="${comp._id}"]`));

            if (!elements.length || (elements.length && elements.every(element => element === null))) {
              return;
            }

            elements.forEach((el, index) => {
              el!.replaceWith(child[index].getContent());
            });
          } else {
            //@ts-ignore
            const stub = this._element.querySelector(`[data-id="${child._id}"]`);
                      
            if (stub) {
              //@ts-ignore
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

  compile(template: any, props: any): string {
    return template(props);
  }

  
  render(props?: any) {}
  
  getContent(): HTMLElement {
    return this._element;
  }
  
  _makePropsProxy(props: {}): IProps {
    const self = this;
  
    return new Proxy(props, {
        get(target: { [key: string]: {} }, property: string) {
            const value = target[property];

            return typeof value === 'function' ? value.bind(target) : value;
        },
        set(target: { [key: string]: {} }, property: string, value: {}) {
            const newTarget = { ...target };

            target[property] = value;
            self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, newTarget);

            return true;
        },
        deleteProperty() {
            throw new Error('Error deleting')
        }
    })
  }
  
  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }
  
  show() {
    this._element.style.display = 'block';
  }
  
  hide() {
    this._element.style.display = 'none';
  }
  }