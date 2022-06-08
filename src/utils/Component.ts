import Handlebars from 'handlebars/dist/handlebars';
import { v4 } from 'uuid';

type Tv4 = () => string;

import { EventBus } from './event-bus';

export type TEvents = { [key: string]: EventListenerOrEventListenerObject };

enum Events {
  flowCDM = 'flow:component-did-mount',
  flowCSU = 'flow:component-should-update',
  flowCDU = 'flow:component-did-update',
  flowRender = 'flow:render',
}

export type TProps = {
  withInternalID?: boolean;
  events?: TEvents;
  attrs?: { [key: string]: string };
}

export type TagName = keyof HTMLElementTagNameMap;

export class Component<Props extends TProps = Record<string, unknown> & { attrs?: { [key: string]: string } }> {
  readonly #element: HTMLElement;
  readonly props: Props;
  readonly children: { [key: string]: Component | Component[] };
  readonly #id: string = (v4 as Tv4)();

  eventBus: EventBus = new EventBus();

  constructor(tagName: TagName = 'div', propsWithChildren: Props = <Props>{}) {
    const { children, props } = this.#getChildren(propsWithChildren);
    this.children = children;
    this.props = this.#makePropsProxy(props);
    this.#element = this.#createDocumentElement(tagName);

    this.eventBus.on(Events.flowCSU, this.#componentShouldUpdate.bind(this));
    this.eventBus.on(Events.flowRender, this.#render.bind(this));
    this.eventBus.on(Events.flowCDU, this.#componentDidUpdate.bind(this));
    this.eventBus.on(Events.flowCDM, this.#componentDidMount.bind(this));

    this.eventBus.emit(Events.flowRender);
    this.eventBus.emit(Events.flowCDU);
    this.eventBus.emit(Events.flowCDM);
  }

  #componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          ch.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  public componentDidMount(): void {
    return;
  }

  public dispatchComponentDidMount(): void {
    this.eventBus.emit(Events.flowCDM);
  }

  #componentShouldUpdate(/*oldProps: Props, newProps: Props*/): void {
    if (this.componentShouldUpdate(/*oldProps, newProps*/)) {
      this.#render();
      this.#componentDidUpdate();
    }
  }

  public componentShouldUpdate(/*oldProps: Props, newProps: Props*/): boolean {
    return true;
  }

  #componentDidUpdate(): void {
    this.#render();
    this.componentDidUpdate();
  }

  public componentDidUpdate(): void {
    return undefined;
  }

  public setProps(nextProps: Props): void {
    if (nextProps) {
      Object.assign(this.props, nextProps);
      this.eventBus.emit(Events.flowCSU);
    }
  }

  #render(): void {
    const block = this.render();
    this.#removeEvents();
    this.#element.innerHTML = '';
    this.#element.appendChild(block);
    this.#addEvents();
    this.#addAttributes();
  }

  public render(): DocumentFragment {
    return this.#createDocumentElement('template').content;
  }

  public get content(): HTMLElement {
    return this.#element;
  }

  #makePropsProxy(props: Props): Props {
    return new Proxy<Props>(props, {
      get(target: Props, p: string): unknown {
        const value: unknown = target[p as keyof TProps];

        return typeof value === 'function' ? (value as () => void).bind(target) : value;
      },

      set: (target: Props, prop: string, value: unknown): boolean => {
        Reflect.set(target, prop, value);

        this.eventBus.emit(Events.flowCDU, { ...target }, target);

        return true;
      },

      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  #createDocumentElement<K extends TagName>(
    tagName: K
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement<K>(tagName);

    if (this.props.withInternalID) {
      element.setAttribute('data-id', this.#id);
    }

    return document.createElement<K>(tagName);
  }

  public show(): void {
    this.#element.removeAttribute('hidden');
  }

  public hide(): void {
    this.#element.hidden = true;
  }

  #getChildren(
    propsWithChildren: Props
  ): { children: { [key: string]: Component<TProps> }, props: Props } {
    const children: { [key: string]: Component<TProps> } = {};
    const props: Props & { [key: string]: unknown } = <Props & { [key: string]: unknown }>{};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        Reflect.set(children, key, value);
      } else if (Array.isArray(value) && value.every(v => v instanceof Component)) {
        Reflect.set(children, key, value);
      } else {
        Reflect.set(props, key, value);
      }
    });

    return { children, props };
  }

  public compile<P extends object = Props>(template: string, props: P = <P>{}): DocumentFragment {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        Reflect.set(propsAndStubs, key, child.map(ch => `<div data-id="${ch.#id}"></div>`));

        return;
      }

      Reflect.set(propsAndStubs, key, `<div data-id="${child.#id}"></div>`);
    });

    const fragment = this.#createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="${ch.#id}"]`);
          stub?.replaceWith(ch.#element);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.#id}"]`);
        stub?.replaceWith(child.#element);
      }
    });

    return fragment.content;
  }

  #addEvents = this.#events('addEventListener');
  #removeEvents = this.#events('removeEventListener');

  #events(eventChangeListener: 'addEventListener' | 'removeEventListener'): () => void {
    return () => {
      const { events = {} } = this.props;

      Object.keys(events).forEach((eventName) => {
        this.#element[eventChangeListener](eventName, events[eventName]);
      });
    };
  }

  #addAttributes(): void {
    const { attrs = {} } = this.props;

    Object.keys(attrs).forEach((attrName: string) => {
      this.#element.setAttribute(attrName, attrs[attrName]);
    });
  }
}
