// language=hbs
import { Input } from 'src/components/Input';
import { Component, TProps } from 'src/utils/Component';
import { IState } from 'src/utils/Store';

type IProps = TProps & {
  action: string;
  user: Input;
};

export class UserForm extends Component<IProps & Partial<IState>> {
  render(): DocumentFragment {
    return this.compile(`
      <header class="modal__header">{{action}} пользователя</header>
      {{{user}}}
      <input type="submit" class="submit-button" value="{{action}}" />
    `, {
      action: this.props.action,
      user: this.props.user,
    });
  }
}
