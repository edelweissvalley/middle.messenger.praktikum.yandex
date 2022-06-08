// language=hbs
import { UserForm } from 'src/pages/chats/chat-details/ModalUser/UserForm';
import { Component, TProps } from 'src/utils/Component';
import { connect, IState } from 'src/utils/Store';

type IProps = TProps & {
  form: UserForm;
  getHiddenFlag(): string;
};

export class ModalUser extends Component<IProps & IState> {
  render(): DocumentFragment {
    return this.compile(
      '<section class="modal__layout" {{hidden}}>{{{form}}}</section>',
      {
        hidden: this.props.getHiddenFlag(),
        form: this.props.form,
      }
    );
  }
}

export const ModalUserConnected: typeof Component<IProps> = connect(ModalUser);
