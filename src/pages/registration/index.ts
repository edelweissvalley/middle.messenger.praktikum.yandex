// language=hbs
import { Component } from 'src/utils/Component';

export class Registration extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <section class="root">
        {{{regForm}}}
      </section>
    `);
  }
}
