import './styles.pcss';

export default `
  <input type="text" class="chats__search" placeholder="Поиск" />
  <div class="chats-list">
    <div class="chats__item">
      <div class="chats__photo"></div>
      <div class="chats__text-col">
        <div class="chats__name">Андрей</div>
        <div class="chats__message">
          Друзья, у меня для вас особенный выпуск новостей!...
        </div>
      </div>
      <div class="chats__info-col">
        <span class="chats__time">10:49</span>
        <span class="chats__message-quantity">2</span>
      </div>
    </div>
    <div class="chats__item">
      <div class="chats__photo"></div>
      <div class="chats__text-col">
        <div class="chats__name">Вадим</div>
        <div class="chats__message">
          В 2008 году художник Jon Rafman начал собирать...
        </div>
      </div>
      <div class="chats__info-col">
        <span class="chats__time">10:49</span>
        <span class="chats__message-quantity">2</span>
      </div>
    </div>
  </div>
`;
