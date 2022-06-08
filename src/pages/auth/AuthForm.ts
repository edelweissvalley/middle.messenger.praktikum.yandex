// language=hbs
import { IEmpty } from 'src/components/Empty';
import { Input } from 'src/components/Input';
import { ILinkProps } from 'src/components/Link';
import { Component, TEvents } from 'src/utils/Component';
import { IValidationSchema, setValidationSchema } from 'src/utils/validation';
import { checkEmptyFocus, checkLogin, checkPassword } from 'src/utils/validationRules';

interface IAuthForm {
  events?: TEvents;
  attrs: { [key: string]: string };
  login?: Input;
  password?: Input;
  submitButton?: Component<IEmpty>;
  noAccount: Component<ILinkProps>;
}

export class AuthForm extends Component<IAuthForm> {
  validationSchema: IValidationSchema = {
    login: {
      rules: [checkEmptyFocus, checkLogin],
      eventNames: ['blur', 'focus'],
    },
    password: {
      rules: [checkEmptyFocus, checkPassword],
      eventNames: ['blur', 'focus'],
    },
  };

  constructor(tagName: keyof HTMLElementTagNameMap | undefined, props: IAuthForm) {
    super(tagName, props);
    setValidationSchema<IAuthForm>(props, this.validationSchema);
  }

  render(): DocumentFragment {
    return this.compile(`
      <div class="small-form__row">
        <h1 class="small-form__header">Вход</h1>
        {{{login}}}
        {{{password}}}
      </div>
      <div class="small-form__row">
        {{{submitButton}}}
        <div class="small-link-parent">
          {{{noAccount}}}
        </div>
      </div>
    `);
  }
}
