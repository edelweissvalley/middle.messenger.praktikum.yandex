import { JSDOM } from 'jsdom';
import { expect } from 'chai';

import { Component } from './Component';

describe('<<<---COMPONENT--->>>', () => {
  let component: Component;

  before(() => {
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost:1234' });
    global.window = dom.window as unknown as Window & typeof globalThis;
    global.document = dom.window.document;
  });

  const props = {
    attrs: {
      class: 'component-class',
    },
    someProp1: 'value1',
    someProp2: 'value2',
  };

  beforeEach(() => {
    component = new Component('form', props);
  });

  it('Передача пропсов', () => {
    expect(component.props.someProp1).to.equal('value1');
    expect(component.props.someProp2).to.equal('value2');
  });

  it('Корректное создание корневого элемента с нужным тегом', () => {
    expect(component.content.tagName).to.equal('FORM');
  });

  it('Обработка атрибутов у корневого элемента', () => {
    expect(component.content.classList.contains('component-class')).to.equal(true);
  });
});
