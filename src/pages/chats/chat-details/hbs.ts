// language=hbs
export default `
  <!--    <div class="chat-details__no-chat">-->
  <!--      Выберите чат, чтобы отправить сообщение-->
  <!--    </div>-->
  <div class="chat-details">
    <div class="chat-details__header">
      <div class="chat-details__user-photo"></div>
      <div class="chat-details__user-name">Вадим</div>
      <div class="chat-details__options"></div>
    </div>
    <div class="chat-details__messages">
      <div class="chat-details__day">19 июня</div>
      {{#each chatDetails}}
        <div class="chat-details__message chat-details__message--{{type}}">
          {{message}}
          <div class="chat-details__message-time">{{time}}</div>
        </div>
      {{/each}}
    </div>
    {{{messageForm}}}
  </div>
`;
