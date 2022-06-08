// language=hbs
import { Component } from 'src/utils/Component';

export class MessageForm extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <label class="chat-details__add-file"><input type="file" hidden /></label>
      <input class="chat-details__message-input" type="text" placeholder="Сообщение" />
      <input class="chat-details__send" type="submit" value="" />
    `);
  }
}
