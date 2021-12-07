export function renderDOM(
  block: {
    getContent: () => Node;
    dispatchComponentDidMount: () => void;
  },
  query = 'body',
): Element | null {
  const root: Element | null = document.querySelector(query);

  root?.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
