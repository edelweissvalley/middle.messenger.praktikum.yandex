// language=hbs
import { Empty, EmptyInput } from 'src/components/Empty';
import { Input, smallFormInputClassName } from 'src/components/Input';
import { Link } from 'src/components/Link';
import { chatsController } from 'src/controllers/Chats.controller';
import { ChatDetails, getCurChat } from 'src/pages/chats/chat-details';
import { MessageForm } from 'src/pages/chats/chat-details/MessageForm';
import { ModalCreateChatConnected } from 'src/pages/chats/chat-details/ModalCreateChat';
import { CreateChatForm } from 'src/pages/chats/chat-details/ModalCreateChat/CreateChatForm';
import { ModalUserConnected } from 'src/pages/chats/chat-details/ModalUser';
import { UserForm } from 'src/pages/chats/chat-details/ModalUser/UserForm';
import { ChatList } from 'src/pages/chats/chat-list';
import { ChatSocket } from 'src/utils/ChatSocket';
import { Component } from 'src/utils/Component';
import { Paths } from 'src/utils/Router';
import { store, StorePaths } from 'src/utils/Store';

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
        events: {
          click: async (e: Event): Promise<void> => {
            const element = (e.target as HTMLElement).closest<HTMLElement>('[data-id]');

            if (element) {
              const currentChat = store.getState().chats.currentChat;
              const currentElement = Number(element.dataset.id);

              if (currentChat !== currentElement) {
                const currentChatId = store.getState().chats.chatsList[currentElement].id;
                const socket = new ChatSocket(
                  store.getState().user?.id as number,
                  currentChatId,
                  await chatsController.getChatToken(currentChatId)
                );

                store.set('chats.currentChat', currentElement);
                store.set(`chats.chatsList.${currentElement}`, { socket });
              }
            }
          },
        },
      }),
      chatDetails: new ChatDetails('div', {
        attrs: {
          class: 'chat-details-col',
        },
        addUserButton: new Component('button', {
          attrs: {
            class: 'chat-details__options-button',
            type: 'button',
            'data-text': 'Добавить пользователя',
          },
          events: {
            click(): void {
              store.set(StorePaths.modalAddUser, !store.getState()?.chats?.modalUserAdd);
            },
          },
        }),
        deleteUserButton: new Component('button', {
          attrs: {
            class: 'chat-details__options-button',
            type: 'button',
            'data-text': 'Удалить пользователя',
          },
          events: {
            click(): void {
              store.set(StorePaths.modalDeleteUser, !store.getState()?.chats?.modalUserDelete);
            },
          },
        }),
        addUserModal: new ModalUserConnected(
          'section',
          {
            getHiddenFlag() {
              return store.getState()?.chats?.modalUserAdd ? '' : 'hidden';
            },

            events: {
              click(e: Event): void {
                const section = e.target as HTMLDivElement;

                if (section?.classList?.contains('modal__layout')) {
                  store.set(StorePaths.modalAddUser, !store.getState()?.chats?.modalUserAdd);
                }
              },
            },

            form: new UserForm('form', {
              action: 'Добавить',
              user: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'user',
                    placeholder: 'ID пользователя',
                    class: smallFormInputClassName,
                  },
                }),
              }),
              attrs: {
                // eslint-disable-next-line sonarjs/no-duplicate-string
                class: 'modal__content modal__content--flex-col',
              },
              events: {
                submit: async (e: Event): Promise<void> => {
                  e.preventDefault();
                  const { user } = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());

                  const response = await chatsController.addUser({ users: [user], chatId: getCurChat()?.id });

                  if (response.status == 200) {
                    store.set(StorePaths.modalAddUser, false);
                  }
                },
              },
            }),
          }
        ),
        deleteUserModal: new ModalUserConnected(
          'section',
          {
            getHiddenFlag() {
              return store.getState()?.chats?.modalUserDelete ? '' : 'hidden';
            },

            events: {
              click(e: Event): void {
                const section = e.target as HTMLDivElement;

                if (section?.classList?.contains('modal__layout')) {
                  store.set(StorePaths.modalDeleteUser, !store.getState()?.chats?.modalUserDelete);
                }
              },
            },

            form: new UserForm('form', {
              action: 'Удалить',
              user: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'user',
                    placeholder: 'ID пользователя',
                    class: smallFormInputClassName,
                  },
                }),
              }),
              attrs: {
                class: 'modal__content modal__content--flex-col',
              },
              events: {
                submit: async (e: Event): Promise<void> => {
                  e.preventDefault();
                  const { user } = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());

                  const response = await chatsController.deleteUser({ users: [user], chatId: getCurChat()?.id });

                  if (response.status == 200) {
                    store.set(StorePaths.modalDeleteUser, false);
                  }
                },
              },
            }),
          }
        ),
        options: new Component('div', {
          attrs: { class: 'chat-details__options' },
          events: {
            click(): void {
              store.set('chats.options', !store.getState().chats.options);
            },
          },
        }),
        messageForm: new MessageForm('form', {
          attrs: { class: 'chat-details__message-sender' },
          events: {
            submit(e: SubmitEvent) {
              e.preventDefault();
              const { message } = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries());
              const { socket } = store.getState().chats.chatsList[store.getState().chats.currentChat as number] || {};
              socket?.socket.send(JSON.stringify({ content: message, type: 'message' }));
              (e.target as HTMLFormElement).reset();
            },
          },
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
            store.set(StorePaths.modalCreateChat, true);
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
                store.set(StorePaths.modalCreateChat, !store.getState()?.chats?.modalCreateChat);
              }
            },
          },
          form: new CreateChatForm('form', {
            chatName: new Input('div', {
              inputElement: new EmptyInput('input', {
                attrs: {
                  type: 'text',
                  name: 'title',
                  placeholder: 'Название чата',
                  class: smallFormInputClassName,
                },
              }),
            }),
            attrs: {
              class: 'modal__content modal__content--flex-col',
            },
            events: {
              submit: async (e: Event): Promise<void> => {
                e.preventDefault();

                const response = await chatsController.create(
                  Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
                );

                if (response.status == 200) {
                  await chatsController.get();
                  store.set(StorePaths.modalCreateChat, !store.getState()?.chats?.modalCreateChat);
                }
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
