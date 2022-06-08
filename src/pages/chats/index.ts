// language=hbs
import { Component } from 'src/utils/Component';

import './styles.pcss';

export class Chats extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <div class="chats">
        <div class="chats-col">
          <div class="chats__go-personal-container">
            <a href="/personal" class="chats__go-personal">Профиль</a>
          </div>
          {{{chatList}}}
        </div>
        {{{chatDetails}}}
      </div>
    `,
      {
        chatList: this.props.chatList,
        chatDetails: this.props.chatDetails,
      }
    );
  }
}
