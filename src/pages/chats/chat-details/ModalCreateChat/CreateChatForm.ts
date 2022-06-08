// language=hbs
import { Input } from 'src/components/Input';
import { Component, TProps } from 'src/utils/Component';
import { IState } from 'src/utils/Store';

type IProps = TProps & {
  chatName: Input;
};

export class CreateChatForm extends Component<IProps & Partial<IState>> {
  render(): DocumentFragment {
    return this.compile(`
      <header class="modal__header">Создать чятъ</header>
      {{{chatName}}}<br />
      <input type="submit" class="submit-button" value="Создать" />
    `, {
      chatName: this.props.chatName,
    });
  }
}
