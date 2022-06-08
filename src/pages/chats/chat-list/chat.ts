// language=hbs
import { Component } from 'src/utils/Component';
import { connect, store } from 'src/utils/Store';

export const Chat = connect(class extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <div class="chats__item{{#if isCurrent}} chats__item--active{{/if}}">
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
          <span class="chats__time">{{last_message.time}}</span>
          <span class="chats__message-quantity">{{unread_count}}</span>
        </div>
      </div>
    `, {
      ...this.props,
      isCurrent: store.getState().chats.currentChat === this.props.i,
    });
  }
});
