// language=hbs
import { IEmpty } from 'src/components/Empty';
import { Input } from 'src/components/Input';
import { ILinkProps } from 'src/components/Link';
import { Component, TEvents } from 'src/utils/Component';

interface IAuthForm {
  events?: TEvents;
  attrs: { [key: string]: string };
  login?: Input;
  password?: Input;
  submitButton?: Component<IEmpty>;
  noAccount: Component<ILinkProps>;
}

export class AuthForm extends Component<IAuthForm> {
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
