// language=hbs
import { Empty, EmptyInput } from 'src/components/Empty';
import { Input, smallFormInputClassName } from 'src/components/Input';
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
              class: smallFormInputClassName,
            },
          }),
        }),
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
        first_name: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'text',
              name: 'first_name',
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
              placeholder: 'Телефон',
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
        password_repeat: new Input('div', {
          inputElement: new EmptyInput('input', {
            attrs: {
              type: 'password',
              name: 'password_repeat',
              placeholder: 'Пароль (ещё раз)',
              class: smallFormInputClassName,
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
