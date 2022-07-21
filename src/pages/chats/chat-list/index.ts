// language=hbs
import { Component } from 'src/utils/Component';
import { connect } from 'src/utils/Store';

import './styles.pcss';

export const ChatList = connect(class extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <input type="text" class="chats__search" placeholder="Поиск" />
      <div class="chats-list">
        {{#each chatList}}
          {{{this}}}
        {{/each}}
      </div>
    `,
      { chatList: this.props.chatList }
    );
  }
});
