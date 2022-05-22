import { Component } from 'src/utils/Component';

export class ServerError extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <section class="5xx root error__root">
        <header class="error-header">500</header>
        <div class="error-message">Мы уже фиксим</div>
        <a href="/chats" class="small-link small-link_error">Назад к чатам</a>
      </section>
    `);
  }
}
