// language=hbs
import { Empty, EmptyInput } from 'src/components/Empty';
import { Input, smallFormInputClassName } from 'src/components/Input';
import { Link } from 'src/components/Link';
import { authController } from 'src/controllers/Auth.controller';
import { userController } from 'src/controllers/User.controller';
import { Avatar } from 'src/pages/personal/avatar';
import { ChangeUser } from 'src/pages/personal/ChangeUser';
import { ModalAvatarConnected } from 'src/pages/personal/ModalAvatar';
import { AvatarForm } from 'src/pages/personal/ModalAvatar/AvatarForm';
import { ModalChangePassConnected } from 'src/pages/personal/ModalChangePass';
import { PassForm } from 'src/pages/personal/ModalChangePass/PassForm';
import { PersonalConnected } from 'src/pages/personal/Personal';
import { Component } from 'src/utils/Component';
import { Paths } from 'src/utils/Router';
import { store } from 'src/utils/Store';

import './styles.pcss';

export function PersonalPage(): Component {
  return new PersonalConnected(
    'section',
    {
      attrs: {
        class: '5xx root error__root',
      },
      form: new ChangeUser('form', {
        attrs: { class: 'personal__form' },
        events: {
          submit(e: Event): void {
            e.preventDefault();
            void userController.update(Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()));
          },
        },
        email: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'email',
              value: store.getState().user?.email || '',
              placeholder: 'Почта',
              class: smallFormInputClassName,
            },
          }),
        }),
        login: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'login',
              value: store.getState().user?.login || '',
              placeholder: 'Логин',
              class: smallFormInputClassName,
            },
          }),
        }),
        first_name: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'first_name',
              value: store.getState().user?.first_name || '',
              placeholder: 'Имя',
              class: smallFormInputClassName,
            },
          }),
        }),
        display_name: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'display_name',
              value: store.getState().user?.display_name || '',
              placeholder: 'Имя',
              class: smallFormInputClassName,
            },
          }),
        }),
        second_name: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'second_name',
              value: store.getState().user?.second_name || '',
              placeholder: 'Фамилия',
              class: smallFormInputClassName,
            },
          }),
        }),
        phone: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'phone',
              value: store.getState().user?.phone || '',
              placeholder: 'Телефон',
              class: smallFormInputClassName,
            },
          }),
        }),

      }),
      backToChatsLink: new Link({
        text: '',
        href: Paths.chats,
        attrs: {
          class: 'personal__back-to-chats',
          title: 'Назад к чатам',
        },
      }),
      logOut: new Empty('input', {
        attrs: {
          class: 'personal__form-title personal__form-title--alert',
          type: 'button',
          value: 'Выйти',
        },
        events: {
          click(): void {
            void authController.logout();
          },
        },
      }),
      changePassword: new Empty('input', {
        attrs: {
          class: 'personal__form-title personal__form-title--blue',
          type: 'button',
          value: 'Изменить пароль',
        },
        events: {
          click(): void {
            store.set('personal.modalChangePass', true);
          },
        },
      }),
      avatar: new Avatar(
        'div',
        {
          attrs: {
            class: 'personal__photo',
          },
          events: {
            click(): void {
              store.set('personal.modalAvatar', true);
            },
          },
        }
      ),
      modalAvatar: new ModalAvatarConnected(
        'section',
        {
          events: {
            click(e: Event): void {
              const section = e.target as HTMLDivElement;

              if (section?.classList?.contains('modal__layout')) {
                store.set('personal.modalAvatar', !store.getState()?.personal?.modalAvatar);
              }
            },
          },
          form: new AvatarForm(
            'form',
            {
              attrs: {
                class: 'modal__content modal__content--flex-col',
                name: 'avatar',
                enctype: 'multipart/form-data',
              },
              events: {
                submit(e: Event): void {
                  e.preventDefault();
                  void userController.updateAvatar(new FormData(e.target as HTMLFormElement));
                },
              },
            }
          ),
        }
      ),
      modalChangePass: new ModalChangePassConnected(
        'section',
        {
          events: {
            click(e: Event): void {
              const section = e.target as HTMLDivElement;

              if (section?.classList?.contains('modal__layout')) {
                store.set('personal.modalChangePass', false);
              }
            },
          },
          form: new PassForm('form', {
            attrs: {
              name: 'change-pass',
              class: 'modal__content',
            },
            oldPassword: new Input('div', {
              inputElement: new EmptyInput('input', {
                attrs: {
                  type: 'text',
                  name: 'oldPassword',
                  placeholder: 'Старый пароль',
                  class: smallFormInputClassName,
                },
              }),
            }),
            newPassword: new Input('div', {
              inputElement: new EmptyInput('input', {
                attrs: {
                  type: 'text',
                  name: 'newPassword',
                  placeholder: 'Новый пароль',
                  class: smallFormInputClassName,
                },
              }),
            }),
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
    }
  );
}
