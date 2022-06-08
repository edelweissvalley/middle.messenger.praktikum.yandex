// language=hbs
import { chatList } from 'src/pages/chats/chat-list/data';
import { Component } from 'src/utils/Component';

import './styles.pcss';

export class ChatList extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <input type="text" class="chats__search" placeholder="Поиск" />
      <div class="chats-list">
        {{#each chatList}}
          <div class="chats__item">
            <div class="chats__photo"></div>
            <div class="chats__text-col">
              <div class="chats__name">{{name}}</div>
              <div class="chats__message">{{message}}</div>
            </div>
            <div class="chats__info-col">
              <span class="chats__time">{{time}}</span>
              <span class="chats__message-quantity">{{unreadMessage}}</span>
            </div>
          </div>
        {{/each}}
      </div>
    `,
      { chatList }
    );
  }
}
