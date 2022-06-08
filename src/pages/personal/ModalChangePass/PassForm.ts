// language=hbs
import { Input } from 'src/components/Input';
import { Component, TProps } from 'src/utils/Component';
import { IState } from 'src/utils/Store';

type IProps = TProps & {
  oldPassword: Input;
  newPassword: Input;
};

export class PassForm extends Component<IProps & Partial<IState>> {
  render(): DocumentFragment {
    return this.compile(`
      <header class="modal__header">Смена пароля</header>
      {{{oldPassword}}} {{{newPassword}}} <br><br>
      <input type="submit" class="submit-button" value="Отправить" />
    `, {
      oldPassword: this.props.oldPassword,
      newPassword: this.props.newPassword,
    });
  }
}
