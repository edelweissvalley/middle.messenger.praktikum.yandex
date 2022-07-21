// language=hbs
export default `
  {{#if hasChats}}
    <div class="chat-details">
      <div class="chat-details__header">
        <div class="chat-details__user-photo">
          {{#if user.avatar}}
            <img
              class="chat-details__user-photo-img"
              src="https://ya-praktikum.tech/api/v2/resources/{{user.avatar}}"
              alt="avatar" width="47" height="47"
            />
          {{/if}}
        </div>
        <div class="chat-details__user-name">{{user.display_name}}</div>
        <div class="chat-details__options"></div>
      </div>
      <div class="chat-details__messages">
        <div class="chat-details__day">{{time}}</div>
        {{#each chatDetails}}
          <div class="chat-details__message chat-details__message--{{type}}">
            {{message}}
            <div class="chat-details__message-time">{{time}}</div>
          </div>
        {{/each}}
      </div>
      {{{messageForm}}}
    </div>
  {{else}}
    <div class="chat-details__no-chat">
      Выберите чат, чтобы отправить сообщение
    </div>
  {{/if}}
`;
