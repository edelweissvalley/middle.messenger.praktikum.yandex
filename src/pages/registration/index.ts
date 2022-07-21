// language=hbs
import { Empty, EmptyInput } from 'src/components/Empty';
import { Input } from 'src/components/Input';
import { Link } from 'src/components/Link';
import { authController } from 'src/controllers/Auth.controller';
import { ChatsPage } from 'src/pages/chats';
import { PersonalPage } from 'src/pages/personal';
import { RegForm } from 'src/pages/registration/RegForm';
import { Component } from 'src/utils/Component';
import { Paths, Router } from 'src/utils/Router';

export class Registration extends Component {
  render(): DocumentFragment {
    return this.compile('{{{regForm}}}');
  }
}

export function RegistrationPage(): Component {
  return new Registration(
    'section',
    {
      attrs: {
        class: 'root',
      },
      regForm: new RegForm('form', {
        attrs: { class: 'small-form' },
        events: {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          submit: async (e: Event): Promise<void> => {
            e.preventDefault();
            await authController.signUp(Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()));

            Router
              .instance
              .use(Paths.chats, ChatsPage)
              .use(Paths.personal, PersonalPage)
              .start();

            await authController.getUser();
            Router.instance.go(Paths.chats);
          },
        },
        email: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'email',
              placeholder: 'Почта',
              // eslint-disable-next-line sonarjs/no-duplicate-string
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
        second_name: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'second_name',
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
        authLink: new Link({
          text: 'Войти',
          href: Paths.auth,
          attrs: { class: 'small-link' },
        }),
      }),
    },
  );
}
