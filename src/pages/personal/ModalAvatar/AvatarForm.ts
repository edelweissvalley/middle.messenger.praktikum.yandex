// language=hbs
import { Component, TProps } from 'src/utils/Component';
import { IState } from 'src/utils/Store';

type IProps = TProps;

export class AvatarForm extends Component<IProps & Partial<IState>> {
  render(): DocumentFragment {
    return this.compile(`
      <header class="modal__header">Загрузите файл</header>
      <input type="file" name="avatar" accept="image/*" required />
      <input type="submit" class="submit-button personal__form-submit" value="Изменить аватар" />
    `);
  }
}
