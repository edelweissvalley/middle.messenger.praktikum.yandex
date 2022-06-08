// language=hbs
import { Empty, EmptyInput } from 'src/components/Empty';
import { Input } from 'src/components/Input';
import { Link } from 'src/components/Link';
import { userController } from 'src/controllers/User.controller';
import { ChatDetails } from 'src/pages/chats/chat-details';
import { MessageForm } from 'src/pages/chats/chat-details/MessageForm';
import { ModalCreateChatConnected } from 'src/pages/chats/chat-details/ModalCreateChat';
import { CreateChatForm } from 'src/pages/chats/chat-details/ModalCreateChat/CreateChatForm';
import { ChatList } from 'src/pages/chats/chat-list';
import { Chat } from 'src/pages/chats/chat-list/chat';
import { Component } from 'src/utils/Component';
import { Paths } from 'src/utils/Router';
import { store } from 'src/utils/Store';

import './styles.pcss';

export class Chats extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <div class="chats-col">
        <div class="chats__go-personal-container">
          {{{createChat}}}{{{modalCreateChat}}}{{{profileLink}}}
        </div>
        {{{chatList}}}
      </div>
      {{{chatDetails}}}
    `,
      {
        chatList: this.props.chatList,
        chatDetails: this.props.chatDetails,
        modalCreateChat: this.props.modalCreateChat,
      }
    );
  }
}

export function ChatsPage(): Component {
  return new Chats(
    'div',
    {
      attrs: {
        class: 'chats',
      },
      chatList: new ChatList('div', {
        chatList: store.getState().chats.chatsList?.map((item, i) => (
          new Chat(
            'div',
            {
              events: {
                click(): void {
                  store.set('chats.currentChat', i);
                },
              },
              ...item,
              i,
            }
          )
        )),
      }),
      chatDetails: new ChatDetails('div', {
        attrs: {
          class: 'chat-details-col',
        },
        messageForm: new MessageForm('form', {
          attrs: { class: 'chat-details__message-sender' },
          events: { submit() { void 0; } },
        }),
      }),
      createChat: new Empty('input', {
        attrs: {
          class: 'create-chat',
          type: 'button',
          value: 'Создать чат',
        },
        events: {
          click(): void {
            store.set('chats.modalCreateChat', true);
          },
        },
      }),
      modalCreateChat: new ModalCreateChatConnected(
        'section',
        {
          events: {
            click(e: Event): void {
              const section = e.target as HTMLDivElement;

              if (section?.classList?.contains('modal__layout')) {
                store.set('chats.modalCreateChat', !store.getState()?.chats?.modalCreateChat);
              }
            },
          },
          form: new CreateChatForm('form', {
            chatName: new Input('div', {
              inputElement: new EmptyInput('input', {
                attrs: {
                  type: 'text',
                  name: 'chat-name',
                  placeholder: 'Название чата',
                  class: 'small-form__input',
                },
              }),
            }),
            attrs: {
              class: 'modal__content modal__content--flex-col',
            },
            events: {
              submit(e: Event): void {
                e.preventDefault();
                void userController.updatePassword(
                  Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
                );
              },
            },
          }),
        }
      ),
      profileLink: new Link({
        text: 'Профиль',
        href: Paths.personal,
        attrs: { class: 'chats__go-personal' },
      }),
    }
  );
}
