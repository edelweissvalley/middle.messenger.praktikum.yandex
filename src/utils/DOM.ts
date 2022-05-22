export function renderDOM(
  block: {
    content: Node;
    dispatchComponentDidMount: () => void;
  },
  query = 'body',
): Element | null {
  const root: Element | null = document.querySelector(query);

  root?.appendChild(block.content);

  block.dispatchComponentDidMount();

  return root;
}
