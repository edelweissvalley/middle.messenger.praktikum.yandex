import Handlebars from 'handlebars/dist/handlebars';

import { EventBus } from './event-bus';

type TEvents = { [key: string]: EventListenerOrEventListenerObject };

enum Events {
  init = 'init',
  flowCDM = 'flow:component-did-mount',
  flowCDU = 'flow:component-did-update',
  flowRender = 'flow:render',
}

export class Block<Props extends Record<string, unknown> & { events?: TEvents } = Record<string, unknown>> {
  readonly #element: HTMLElement;
  readonly props: Props;

  eventBus: () => EventBus;

  constructor(tagName = 'div', props: Props = <Props>{}) {
    const eventBus = new EventBus();
    this.props = this.#makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.#element = Block.#createDocumentElement(tagName);

    this.#registerEvents(eventBus);

    eventBus.emit(Events.init);
  }

  #registerEvents(eventBus: EventBus): void {
    eventBus.on(Events.init, this.init.bind(this));
    eventBus.on(Events.flowCDM, this.#componentDidMount.bind(this));
    eventBus.on(Events.flowCDU, this.#componentDidUpdate.bind(this));
    eventBus.on(Events.flowRender, this.#render.bind(this));
  }

  private init(): void {
    this.eventBus().emit(Events.flowRender);
    this.eventBus().emit(Events.flowCDM);
  }

  #componentDidMount(): void {
    this.componentDidMount();
  }

  public componentDidMount(): void {
    return;
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Events.flowCDM);
  }

  #componentDidUpdate(/*oldProps: Props, newProps: Props*/): void {
    if (this.componentDidUpdate(/*oldProps, newProps*/)) {
      this.#render();
    }
  }

  public componentDidUpdate(/*oldProps: Props, newProps: Props*/): boolean {
    return true;
  }

  public setProps(nextProps: Props): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Events.flowCDU);
    this.eventBus().emit(Events.flowRender);
    this.eventBus().emit(Events.flowCDM);
  }

  #render(): void {
    this.#addEvents();
    this.#element.innerHTML = Handlebars.compile(this.render())(this.props);
  }

  public render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    return this.#element;
  }

  #makePropsProxy(props: Props): Props {
    return new Proxy<Props>(props, {
      set: (target: Props, prop: string, value: unknown): boolean => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[prop] = value;

        this.eventBus().emit(Events.flowCDU, { ...target }, target);

        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  static #createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  public show(): void {
    this.getContent().style.display = 'block';
  }

  public hide(): void {
    this.getContent().style.display = 'none';
  }

  #addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this.#element.addEventListener(eventName, events[eventName]);
    });
  }
}
