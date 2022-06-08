import { Empty } from 'src/components/Empty';
import { Link } from 'src/components/Link';
import { Avatar } from 'src/pages/personal/avatar';
import { ChangeUser, IChangeUser } from 'src/pages/personal/ChangeUser';
import { ModalAvatar } from 'src/pages/personal/ModalAvatar';
import { ModalChangePass } from 'src/pages/personal/ModalChangePass';
import { Component, TProps } from 'src/utils/Component';
import { Indexed } from 'src/utils/helpers';
import { connect, IState } from 'src/utils/Store';

interface IProps extends TProps {
  backToChatsLink: Link;
  logOut: Empty<unknown>;
  changePassword: Empty<unknown>;
  form: typeof ChangeUser<IChangeUser>;
  modalAvatar: ModalAvatar;
  modalChangePass: ModalChangePass;
  avatar: typeof Avatar;
}

export class Personal extends Component<IProps & IState> {
  render(): DocumentFragment {
    return this.compile(`
      <section class="root-personal">
        {{{backToChatsLink}}}
        <div class="personal">
          {{{avatar}}}
          <div class="personal__name">{{user.first_name}} {{user.second_name}}</div>
          {{{form}}}
          <div class="personal-functions">
            <div class="personal__form-label">
              {{{changePassword}}}
            </div>
            <div class="personal__form-label">
              {{{logOut}}}
            </div>
          </div>
        </div>
      </section>
      {{{modalAvatar}}}
      {{{modalChangePass}}}
    `, {
      backToChatsLink: this.props.backToChatsLink,
      logOut: this.props.logOut,
      changePassword: this.props.changePassword,
      form: this.props.form,
      modalAvatar: this.props.modalAvatar,
      modalChangePass: this.props.modalChangePass,
      avatar: this.props.avatar,
    });
  }
}

export const PersonalConnected: typeof Component = connect(
  Personal,
  (state: Indexed<Record<string, string>>) => (state?.personal)
);
