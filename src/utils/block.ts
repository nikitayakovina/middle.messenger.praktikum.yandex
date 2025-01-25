import EventBus from "./eventBus";
import Handlebars from "handlebars"
import { renderDom } from "./renderDom";
import {v4 as makeUUID} from 'uuid';

type EventBusType = { [key: string]: string };
type Meta = { [key: string]: string | object };
export type Events = Record<string, (event: Event) => void>;

interface IProps {
    // events?: EventMap;
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
  _events: Events;
  _id: string = '';

  eventBus: () => EventBus;
  
  constructor(props = {}, events: Events = {} ) {
    const eventBus = new EventBus();

    this._meta = {
      props
    };
    this._events = events;
    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...props   });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }
  
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }
  
  _createResources(): void {
    this._element = this._createDocumentElement('div');
  }
  
  init(): void {
    this._createResources();
    this._render();
  }
  
  _componentDidMount(): void {
    // this.componentDidMount();
  }
  
//   componentDidMount(oldProps) {}
  
  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }
  
  _componentDidUpdate(oldProps: {}, newProps: {}) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
        return;
    }

    this._render();
  }
  
  componentDidUpdate(oldProps: {}, newProps: {}): boolean {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
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
        const content = this.render();
        //@ts-ignore
        this._element.innerHTML = content;
        this._element.setAttribute('data-id', this._id);
        this._addEvents();
    }
  }

  _addEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element?.addEventListener(eventName, this._events[eventName]);
    });
  }

  _removeEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, this._events[eventName]);
    });
  }

  compile(template: any, props: any): string {
    return template(props);
  }

  
  render() {}
  
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