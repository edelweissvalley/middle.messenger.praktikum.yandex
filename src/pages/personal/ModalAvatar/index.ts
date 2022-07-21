// language=hbs
import { AvatarForm } from 'src/pages/personal/ModalAvatar/AvatarForm';
import { Component, TProps } from 'src/utils/Component';
import { Indexed } from 'src/utils/helpers';
import { connect, IState, store } from 'src/utils/Store';

type IProps = TProps & { form: AvatarForm };

export class ModalAvatar extends Component<IProps & IState> {
  render(): DocumentFragment {
    return this.compile(`
      <section class="modal__layout" {{hidden}}>{{{form}}}</section>
    `, {
      hidden: store.getState()?.personal?.modalAvatar ? '' : 'hidden',
      form: this.props.form,
    });
  }
}

export const ModalAvatarConnected: typeof Component = connect(
  ModalAvatar,
  (state: Indexed<Record<string, string>>) => (state?.personal)
);
