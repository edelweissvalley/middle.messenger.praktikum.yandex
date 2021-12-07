import { Block } from '../utils/Block';

export class ServerError extends Block {
  render(): string {
    return `
      <section class="5xx root error__root">
        <header class="error-header">500</header>
        <div class="error-message">Мы уже фиксим</div>
        <a href="/chats" class="small-link small-link_error">Назад к чатам</a>
      </section>
    `;
  }
}
