import hbs from 'src/pages/chats/chat-details/hbs';
import { Component } from 'src/utils/Component';
import { connect, IChat, store } from 'src/utils/Store';

import './styles.pcss';

export function getCurChat(): IChat | null {
  const { chatsList, currentChat } = store.getState().chats;

  return chatsList?.[currentChat || 0] || currentChat;
}

export const ChatDetails = connect(class extends Component {

  componentDidUpdate() {
    const messageBody = document.querySelector('.chat-details__messages') as HTMLElement;

    if (messageBody) {
      messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
  }

  render(): DocumentFragment {
    const { chatsList, currentChat } = store.getState().chats;

    return this.compile(hbs, {
      addUserButton: this.props.addUserButton,
      deleteUserButton: this.props.deleteUserButton,
      addUserModal: this.props.addUserModal,
      deleteUserModal: this.props.deleteUserModal,
      hasChats: typeof store.getState().chats.currentChat === 'number',
      currentChat: getCurChat(),
      messages: store.getState().chats.messages,
      options: this.props.options,
      optionsHide: store.getState()?.chats?.options ? '' : 'hidden',
      messageForm: this.props.messageForm,
      user: chatsList?.[currentChat as number]?.last_message?.user,
      time: chatsList?.[currentChat as number]?.last_message?.time?.slice(0, 10),
    });
  }
});
