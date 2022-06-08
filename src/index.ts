import 'normalize.css';

import { Empty, EmptyInput } from 'src/components/Empty';
import { Input } from 'src/components/Input';
import { NotFound } from 'src/pages/404';
import { ServerError } from 'src/pages/5xx';
import { Auth } from 'src/pages/auth';
import { AuthForm } from 'src/pages/auth/AuthForm';
import { Chats } from 'src/pages/chats';
import { ChatDetails } from 'src/pages/chats/chat-details';
import { MessageForm } from 'src/pages/chats/chat-details/MessageForm';
import { ChatList } from 'src/pages/chats/chat-list/index.hbs';
import { Personal } from 'src/pages/personal';
import { Registration } from 'src/pages/registration';
import { RegForm } from 'src/pages/registration/RegForm';
import { renderDOM } from 'src/utils/DOM';
import { submitHandler } from 'src/utils/helpers';

import './index.pcss';
import './common.pcss';
import './pages/error-pages.pcss';
import './pages/small-form.pcss';

enum Paths {
  core = '/',
  auth = '/auth',
  registration = '/registration',
  chats = '/chats',
  personal = '/personal',
  notFound = '/404',
  serverError = '/500',
}

function route(): void {
  switch (location.pathname) {
    case Paths.core:
      location.pathname = Paths.auth;

      break;

    case Paths.auth:
      renderDOM(
        new Auth(
          'section',
          {
            attrs: { class: 'root' },
            authForm: new AuthForm('form', {
              attrs: { class: 'small-form' },
              events: { submit: submitHandler },
              login: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'login',
                    placeholder: 'Логин',
                    // eslint-disable-next-line sonarjs/no-duplicate-string
                    class: 'small-form__input',
                  },
                }),
              }),
              password: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Пароль',
                    class: 'small-form__input',
                  },
                }),
               }),
              submitButton: new Empty('input', {
                attrs: {
                  class: 'submit-button',
                  type: 'submit',
                  value: 'Авторизоваться',
                },
              }),
            }),
          }
        )
      );

      break;

    case Paths.registration:
      renderDOM(
        new Registration(
          'div',
          {
            regForm: new RegForm('form', {
              attrs: { class: 'small-form' },
              events: { submit: submitHandler },
              email: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'email',
                    placeholder: 'Почта',
                    class: 'small-form__input',
                  },
                }),
              }),
              login: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'login',
                    placeholder: 'Логин',
                    class: 'small-form__input',
                  },
                }),
              }),
              first_name: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'first_name',
                    placeholder: 'Имя',
                    class: 'small-form__input',
                  },
                }),
              }),
              last_name: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'last_name',
                    placeholder: 'Фамилия',
                    class: 'small-form__input',
                  },
                }),
              }),
              phone: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'text',
                    name: 'phone',
                    placeholder: 'Телефон',
                    class: 'small-form__input',
                  },
                }),
              }),
              password: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Пароль',
                    class: 'small-form__input',
                  },
                }),
              }),
              password_repeat: new Input('div', {
                inputElement: new EmptyInput('input', {
                  attrs: {
                    type: 'password',
                    name: 'password_repeat',
                    placeholder: 'Пароль (ещё раз)',
                    class: 'small-form__input',
                  },
                }),
              }),
              submitButton: new Empty('input', {
                attrs: {
                  class: 'submit-button',
                  type: 'submit',
                  value: 'Зарегистрироваться',
                },
              }),
            }),
          },
        )
      );

      break;

    case Paths.chats:
      renderDOM(
        new Chats(
          'div',
          {
            chatList: new ChatList,
            chatDetails: new ChatDetails('div', {
              attrs: {
                class: 'chat-details-col',
              },
              messageForm: new MessageForm('form', {
                attrs: { class: 'chat-details__message-sender' },
                events: { submit: submitHandler },
              }),
            }),
          }
        )
      );

      break;

    case Paths.personal:
      renderDOM(new Personal);

      break;

    case Paths.notFound:
    default:
      renderDOM(new NotFound);

      break;

    case Paths.serverError:
      renderDOM(new ServerError);

      break;
  }
}

document.addEventListener('DOMContentLoaded', route);
