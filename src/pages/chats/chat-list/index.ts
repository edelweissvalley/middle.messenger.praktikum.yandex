// language=hbs
import { Component } from 'src/utils/Component';
import { connect, store } from 'src/utils/Store';

import './styles.pcss';

export const ChatList = connect(class extends Component {
  render(): DocumentFragment {
    const currentChat = store.getState().chats.currentChat;
    const chatList = store.getState().chats.chatsList.map((chat, i) => ({
      ...chat,
      time: new Date(chat?.last_message?.time as string).toLocaleTimeString(),
      isCurrent: currentChat === i,
    })) || [];

    return this.compile(`
      <input type="text" class="chats__search" placeholder="Поиск" />
      <div class="chats-list">
        {{#each chatList}}
          <div class="chats__item{{#if isCurrent}} chats__item--active{{/if}}" data-id="{{@index}}">
            <div class="chats__photo">
              {{#if avatar}}
                <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar}}" alt="avatar" width="47" height="47">
              {{/if}}
            </div>
            <div class="chats__text-col">
              <div class="chats__name">{{title}}</div>
              <div class="chats__message">{{last_message.content}}</div>
            </div>
            <div class="chats__info-col">
              <span class="chats__time">{{time}}</span>
              <span class="chats__message-quantity">{{unread_count}}</span>
            </div>
          </div>
        {{/each}}
      </div>
    `,
      { chatList }
    );
  }
});
