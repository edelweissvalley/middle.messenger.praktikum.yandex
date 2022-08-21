// language=hbs
import { Input } from 'src/components/Input';
import { Component, TEvents } from 'src/utils/Component';
import { connect, store } from 'src/utils/Store';
import { IValidationSchema, setValidationSchema } from 'src/utils/validation';
import { checkLogin, checkMail } from 'src/utils/validationRules';

export interface IChangeUser {
  events?: TEvents;
  attrs: { [key: string]: string };
  email?: Input;
  login?: Input;
  first_name?: Input;
  second_name?: Input;
  phone?: Input;
  display_name?: Input;
}

export const ChangeUser: typeof Component = connect(
  class extends Component<IChangeUser> {
    validationSchema: IValidationSchema = {
      login: {
        rules: [checkLogin],
        eventNames: ['blur', 'focus'],
      },
      email: {
        rules: [checkMail],
        eventNames: ['blur', 'focus'],
      },
      first_name: {
        rules: [],
        eventNames: ['blur', 'focus'],
      },
      display_name: {
        rules: [],
        eventNames: ['blur', 'focus'],
      },
      second_name: {
        rules: [],
        eventNames: ['blur', 'focus'],
      },
      phone: {
        rules: [],
        eventNames: ['blur', 'focus'],
      },
    };

    constructor(tagName: keyof HTMLElementTagNameMap | undefined, props: IChangeUser) {
      super(tagName, props);
      setValidationSchema<IChangeUser>(props, this.validationSchema);
    }

    render(): DocumentFragment {
      return this.compile(`
        {{{email}}}
        {{{login}}}
        {{{first_name}}}
        {{{second_name}}}
        {{{display_name}}}
        {{{phone}}}
        <div class="personal__form-submit-container">
          <input type="submit" class="submit-button personal__form-submit" value="Сохранить" />
        </div>
      `, {
        editData: store.getState()?.personal?.editData ? '' : 'readonly',
        email: this.props.email,
        login: this.props.login,
        first_name: this.props.first_name,
        second_name: this.props.second_name,
        phone: this.props.phone,
        display_name: this.props.display_name,
      });
    }
  }
);
