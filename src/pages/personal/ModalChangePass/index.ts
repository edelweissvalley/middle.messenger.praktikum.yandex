// language=hbs
import { PassForm } from 'src/pages/personal/ModalChangePass/PassForm';
import { Component, TProps } from 'src/utils/Component';
import { Indexed } from 'src/utils/helpers';
import { connect, IState, store } from 'src/utils/Store';

type IProps = TProps & { form: PassForm };

export class ModalChangePass extends Component<IProps & IState> {
  render(): DocumentFragment {
    return this.compile(`
      <section class="modal__layout" {{hidden}}>{{{form}}}</section>
    `, {
      hidden: store.getState()?.personal?.modalChangePass ? '' : 'hidden',
      form: this.props.form,
    });
  }
}

export const ModalChangePassConnected: typeof Component<TProps & { form: PassForm }> = connect(
  ModalChangePass,
  (state: Indexed<Record<string, string>>) => (state?.personal)
);
