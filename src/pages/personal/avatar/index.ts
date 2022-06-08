import { Component } from 'src/utils/Component';
import { connect, store } from 'src/utils/Store';

export const Avatar = connect(
  class extends Component {
    render(): DocumentFragment {
      return this.compile(
        '<img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="" /> ',
        {
          avatar: store.getState().user?.avatar,
        }
      );
    }
  }
);
