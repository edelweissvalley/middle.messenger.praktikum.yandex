import { chatDetails } from 'src/pages/chats/chat-details/data';
import hbs from 'src/pages/chats/chat-details/hbs';
import { Component } from 'src/utils/Component';

import './styles.pcss';

export class ChatDetails extends Component {
  render(): DocumentFragment {
    return this.compile(hbs, {
      chatDetails,
      messageForm: this.props.messageForm,
    });
  }
}
