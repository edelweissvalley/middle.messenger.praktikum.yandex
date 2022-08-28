import { Component } from './Component';
import { renderDOM } from './DOM';

export enum Paths {
  core = '/',
  coreEmpty = '',
  auth = '/auth',
  registration = '/registration',
  chats = '/chats',
  personal = '/personal',
  notFound = '/404',
  serverError = '/500',
}

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

type Page = () => Component;

class Route {
  #pathname: Paths;
  #block: Component | null;
  #props: { rootQuery?: string };
  readonly #blockClass: Page;

  constructor(pathname: Paths, view: Page, props: { rootQuery: string }) {
    this.#pathname = pathname;
    this.#blockClass = view;
    this.#block = null;
    this.#props = props;
  }

  navigate(pathname: Paths): void {
    if (this.match(pathname)) {
      this.#pathname = pathname;
      this.render();
    }
  }

  public leave(): void {
    this.#block?.hide();
  }

  public match(pathname: Paths): boolean {
    return isEqual(pathname, this.#pathname);
  }

  render() {
    if (!this.#block) {
      this.#block = this.#blockClass();
      renderDOM(this.#block, this.#props.rootQuery);

      return;
    }

    this.#block.show();
  }
}

export class Router {
  public static instance: Router;

  #currentRoute: Route | null;
  #notFoundPath: Paths | null = null;
  readonly #history: History = window.history;
  readonly #routes: Route[] = [];
  readonly #rootQuery: string;
  readonly #redirects: [Paths, Paths][] = [];
  readonly #processedPaths: Paths[] = [];

  constructor(rootQuery: string) {
    this.#currentRoute = null;
    this.#rootQuery = rootQuery;

    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;
  }

  #setProcessedPaths(path: Paths): void {
    this.#processedPaths.push(path);
  }

  public setNotFound(path: Paths, block: Page): Router {
    this.#notFoundPath = path;
    this.use(path, block);

    return this;
  }

  public use(pathname: Paths, block: () => Component): Router {
    this.#setProcessedPaths(pathname);
    const route = new Route(pathname, block, { rootQuery: this.#rootQuery });
    this.#routes.push(route);

    return this;
  }

  public redirect(from: Paths, to: Paths): Router {
    this.#setProcessedPaths(from);
    this.#redirects.push([from, to]);

    return this;
  }

  #throwExceptions(path: Paths): boolean {
    const redirectIndex: number = this.#redirects.findIndex(([from]: [Paths, Paths]) => (from === path));

    /**
     * Редирект, если путь для него зарегистрирован
     */
    if (redirectIndex > -1) {
      this.go(this.#redirects[redirectIndex][1]);

      return true;
    }

    /**
     * 404
     */
    if (!this.#processedPaths.includes(path) && this.#notFoundPath) {
      this.go(this.#notFoundPath);

      return true;
    }

    /**
     * Переход
     */
    this.#onRoute(path);

    return false;
  }

  public start(): Router {
    window.onpopstate = (() => {
      this.#throwExceptions(window.location.pathname as Paths);
    });

    this.#throwExceptions(window.location.pathname as Paths);

    return this;
  }

  #onRoute(pathname: Paths): void {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.#currentRoute && this.#currentRoute !== route) {
      this.#currentRoute?.leave();
    }

    this.#currentRoute = route;
    route.render();
  }

  public go(pathname: Paths): void {
    if (!this.#throwExceptions(pathname)) {
      this.#history.pushState({}, '', pathname);
      this.#onRoute(pathname);
    }
  }

  public back(): void {
    this.#history.back();
  }

  public forward(): void {
    this.#history.forward();
  }

  private getRoute(pathname: Paths) {
    return this.#routes.find(route => route.match(pathname));
  }
}
