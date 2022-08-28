import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { Paths, Router } from './Router';

describe('<<<---ROUTER--->>>', () => {
  let router: Router;

  before(() => {
    const dom = new JSDOM('<div id="root"></div>', {
      url: 'http://localhost:1234',
    })
    global.window = dom.window as unknown as Window & typeof globalThis
    global.document = dom.window.document

    router = new Router('#root');
  });

  it('Реализован Синглтон', () => {
    expect(router).to.equal(new Router(''));
  });

  it('Подписка на событие onpopstate', () => {
    expect(window.onpopstate).to.be.null;
    router.start();
    expect(window.onpopstate).not.to.be.null;
  });

  it('Принудительный переход по адресу', () => {
    router.go(Paths.auth);
    expect(window.location.pathname).eq(Paths.auth);
  });
});
