// language=hbs
import { Empty, EmptyInput } from 'src/components/Empty';
import { Input, smallFormInputClassName } from 'src/components/Input';
import { Link } from 'src/components/Link';
import { authController } from 'src/controllers/Auth.controller';
import { chatsController } from 'src/controllers/Chats.controller';
import { AuthForm } from 'src/pages/auth/AuthForm';
import { ChatsPage } from 'src/pages/chats';
import { PersonalPage } from 'src/pages/personal';
import { Component } from 'src/utils/Component';
import { Paths, Router } from 'src/utils/Router';

export class Auth extends Component {
  render(): DocumentFragment {
    return this.compile('{{{authForm}}}');
  }
}

export function AuthPage(): Component {
  return new Auth(
    'section',
    {
      attrs: { class: 'root' },
      authForm: new AuthForm('form', {
        attrs: { class: 'small-form' },
        events: {
          submit: async (e: Event): Promise<void> => {
            e.preventDefault();
            await authController.signIn(Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()));

            Router
              .instance
              .use(Paths.chats, ChatsPage)
              .use(Paths.personal, PersonalPage)
              .start();

            await authController.getUser();
            await chatsController.get();
          },
        },
        login: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'login',
              placeholder: 'Логин',
              class: smallFormInputClassName,
            },
          }),
        }),
        password: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'password',
              name: 'password',
              placeholder: 'Пароль',
              class: smallFormInputClassName,
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
        noAccount: new Link({
          text: 'Нет аккаунта?',
          href: Paths.registration,
          attrs: { class: 'small-link' },
        }),
      }),
    }
  );
}
