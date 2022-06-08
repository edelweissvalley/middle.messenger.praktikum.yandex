// language=hbs
import { Component } from 'src/utils/Component';

export class Auth extends Component {
  render(): DocumentFragment {
    return this.compile('{{{authForm}}}');
  }
}
