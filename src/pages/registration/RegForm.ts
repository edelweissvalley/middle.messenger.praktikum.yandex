// language=hbs
import { IEmpty } from 'src/components/Empty';
import { Input } from 'src/components/Input';
import { Component, TEvents } from 'src/utils/Component';
import { IValidationSchema, setValidationSchema } from 'src/utils/validation';
import { checkLogin, checkMail, checkPassword, checkPasswordRepeat } from 'src/utils/validationRules';

interface IRegForm {
  events?: TEvents;
  attrs: { [key: string]: string };
  email?: Input;
  login?: Input;
  first_name?: Input;
  last_name?: Input;
  phone?: Input;
  password?: Input;
  password_repeat?: Input;
  submitButton?: Component<IEmpty>;
}

export class RegForm extends Component<IRegForm> {
  validationSchema: IValidationSchema = {
    login: {
      rules: [checkLogin],
      eventNames: ['blur', 'focus'],
    },
    password: {
      rules: [checkPassword],
      eventNames: ['blur', 'focus'],
    },
    email: {
      rules: [checkMail],
      eventNames: ['blur', 'focus'],
    },
    first_name: {
      rules: [],
      eventNames: ['blur', 'focus'],
    },
    last_name: {
      rules: [],
      eventNames: ['blur', 'focus'],
    },
    phone: {
      rules: [],
      eventNames: ['blur', 'focus'],
    },
    password_repeat: {
      rules: [checkPassword, checkPasswordRepeat],
      eventNames: ['blur', 'focus'],
    },
};

  constructor(tagName: keyof HTMLElementTagNameMap | undefined, props: IRegForm) {
    super(tagName, props);
    setValidationSchema<IRegForm>(props, this.validationSchema);
  }

  render(): DocumentFragment {
    return this.compile(`
      <div class="small-form__row">
        <h1 class="small-form__header">Регистрация</h1>
        {{{email}}}
        {{{login}}}
        {{{first_name}}}
        {{{last_name}}}
        {{{phone}}}
        {{{password}}}
        {{{password_repeat}}}
      </div>
      <div class="small-form__row">
        {{{submitButton}}}
        <div class="small-link-parent">
          <a href="/auth" class="small-link">Войти</a>
        </div>
      </div>
    `);
  }
}
