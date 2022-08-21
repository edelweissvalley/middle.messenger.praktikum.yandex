import { Link } from 'src/components/Link';
import { Component } from 'src/utils/Component';
import { Paths } from 'src/utils/Router';

export class NotFound extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <header class="error-header">404</header>
      <div class="error-message">Не туда попали</div>
      {{{backToChatsLink}}}
    `, { backToChatsLink: this.props.backToChatsLink });
  }
}

export function NotFoundPage(): Component {
  return new NotFound(
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
