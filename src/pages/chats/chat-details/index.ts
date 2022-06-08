import { chatDetails } from 'src/pages/chats/chat-details/data';
import hbs from 'src/pages/chats/chat-details/hbs';
import { Component } from 'src/utils/Component';
import { store } from 'src/utils/Store';
import './styles.pcss';

export class ChatDetails extends Component {
  render(): DocumentFragment {
    const hasChats = (typeof store.getState().chats.currentChat === 'number');
    const { chatsList, currentChat } = store.getState().chats;

    return this.compile(hbs, {
      hasChats,
      currentChat: store.getState().chats.currentChat,
      chatDetails,
      messageForm: this.props.messageForm,
      user: chatsList?.[currentChat as number]?.last_message?.user,
      time: chatsList?.[currentChat as number]?.last_message?.time?.slice(0, 10),
    });
  }
}
