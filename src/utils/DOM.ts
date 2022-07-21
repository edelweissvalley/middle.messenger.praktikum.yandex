import { Component } from 'src/utils/Component';

export function renderDOM(
  block: Component,
  query = 'body',
): Element | null {
  const root: Element | null = document.querySelector(query);

  root?.appendChild(block.content);

  block.dispatchComponentDidMount();

  return root;
}
