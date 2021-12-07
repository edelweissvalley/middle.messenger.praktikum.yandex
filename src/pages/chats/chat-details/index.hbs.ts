import './styles.pcss';

export default `
  <div class="chat-details-col">
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
        <div class="chat-details__message chat-details__message--outgoing">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sint.
          <div class="chat-details__message-time">11:56</div>
        </div>
        <div class="chat-details__message chat-details__message--incoming">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci consequatur
          consequuntur debitis fugiat, labore nostrum placeat provident, quidem quis quo quos
          repellendus sed ut vel veritatis voluptate! Aliquam nobis, vitae. Dicta, non quasi.
          Corporis cum impedit, nobis numquam sit voluptas. A amet animi atque delectus distinctio
          dolores dolorum eaque eum expedita fugit id illo ipsum labore laboriosam maxime molestiae
          neque nisi, non nulla numquam quae quasi quibusdam rerum saepe sed, similique soluta totam
          velit veniam voluptate! Accusamus ad alias, aspernatur cumque cupiditate enim esse est expedita
          fugiat illo illum inventore ipsam ipsum iste laboriosam magni maiores minima modi non praesentium
          quae qui quibusdam quos rem repellendus tempore unde voluptas. Adipisci animi consequuntur dicta
          dolor error explicabo facilis hic itaque laborum modi natus nemo odio optio praesentium quam
          quibusdam quisquam rem repellat reprehenderit sequi sint suscipit tempora temporibus unde vel
          <div class="chat-details__message-time">11:56</div>
        </div>
        <div class="chat-details__message chat-details__message--incoming">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, sint.
          <div class="chat-details__message-time">11:56</div>
        </div>
        <div class="chat-details__message chat-details__message--outgoing chat-details__message--read">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci consequatur
          consequuntur debitis fugiat, labore nostrum placeat provident, quidem quis quo quos
          repellendus sed ut vel veritatis voluptate! Aliquam nobis, vitae. Dicta, non quasi.
          Corporis cum impedit, nobis numquam sit voluptas. A amet animi atque delectus distinctio
          dolores dolorum eaque eum expedita fugit id illo ipsum labore laboriosam maxime molestiae
          neque nisi, non nulla numquam quae quasi quibusdam rerum saepe sed, similique soluta totam
          velit veniam voluptate! Accusamus ad alias, aspernatur cumque cupiditate enim esse est expedita
          fugiat illo illum inventore ipsam ipsum iste laboriosam magni maiores minima modi non praesentium
          quae qui quibusdam quos rem repellendus tempore unde voluptas. Adipisci animi consequuntur dicta
          dolor error explicabo facilis hic itaque laborum modi natus nemo odio optio praesentium quam
          quibusdam quisquam rem repellat reprehenderit sequi sint suscipit tempora temporibus unde vel
          <div class="chat-details__message-time">11:56</div>
        </div>
      </div>
      <form class="chat-details__message-sender">
        <label class="chat-details__add-file"><input type="file" hidden /></label>
        <input class="chat-details__message-input" type="text" placeholder="Сообщение" />
        <input class="chat-details__send" type="submit" value="" />
      </form>
    </div>
  </div>
`;
