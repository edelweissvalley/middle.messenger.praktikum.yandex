import { Component } from 'src/utils/Component';

export class NotFound extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <section class="5xx root error__root">
        <header class="error-header">404</header>
        <div class="error-message">Не туда попали</div>
        <a href="/chats" class="small-link small-link_error">Назад к чатам</a>
      </section>
    `);
  }
}
