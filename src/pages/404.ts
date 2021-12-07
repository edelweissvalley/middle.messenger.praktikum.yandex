import { Block } from '../utils/Block';

export class NotFound extends Block {
  render(): string {
    return `
      <section class="5xx root error__root">
        <header class="error-header">404</header>
        <div class="error-message">Не туда попали</div>
        <a href="/chats" class="small-link small-link_error">Назад к чатам</a>
      </section>
    `;
  }
}
