// language=hbs
import { CreateChatForm } from 'src/pages/chats/chat-details/ModalCreateChat/CreateChatForm';
import { Component, TProps } from 'src/utils/Component';
import { connect, IState, store } from 'src/utils/Store';

type IProps = TProps & { form: CreateChatForm };

export class ModalCreateChat extends Component<IProps & IState> {
  render(): DocumentFragment {
    return this.compile(`
      <section class="modal__layout" {{hidden}}>{{{form}}}</section>
    `, {
      hidden: store.getState()?.chats?.modalCreateChat ? '' : 'hidden',
      form: this.props.form,
    });
  }
}

export const ModalCreateChatConnected: typeof Component<TProps & { form: CreateChatForm }> = connect(
  ModalCreateChat
);
