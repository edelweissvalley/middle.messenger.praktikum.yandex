import './styles.pcss';

import { Block } from '../../utils/Block';

export class Chats extends Block {
  render(): string {
    return `
      <div class="chats">
        <div class="chats-col">
          <div class="chats__go-personal-container">
            <a href="/personal" class="chats__go-personal">Профиль</a>
          </div>
          {{>ChatList}}
        </div>
        {{>ChatDetails}}
      </div>
    `;
  }
}
