import { Link } from 'src/components/Link';
import { Component } from 'src/utils/Component';
import { Paths } from 'src/utils/Router';

export class ServerError extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <header class="error-header">500</header>
      <div class="error-message">Мы уже фиксим</div>
      {{{backToChatsLink}}}
    `, { backToChatsLink: this.props.backToChatsLink });
  }
}

export function ServerErrorPage(): Component {
  return new ServerError(
    'section',
    {
      attrs: {
        class: '5xx root error__root',
      },
      backToChatsLink: new Link({
        text: 'Назад к чатам',
        href: Paths.chats,
        attrs: { class: 'small-link small-link_error' },
      }),
    }
  );
}
