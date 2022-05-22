// language=hbs
import { Component } from 'src/utils/Component';
import './styles.pcss';

export class Personal extends Component {
  render(): DocumentFragment {
    return this.compile(`
      <section class="root-personal">
        <a href="/chats" title="Назад к чатам" class="personal__back-to-chats"></a>
        <div class="personal">
          <div class="personal__photo"></div>
          <div class="personal__name">Иван Новиков</div>
          <form class="personal__form">
            <div class="personal__form-label">
              <span class="personal__form-title">Почта</span>
              <input readonly type="text" placeholder="placeholder" class="personal__form-input" value="pochta@yandex.ru" />
            </div>
            <div class="personal__form-label">
              <span class="personal__form-title">Логин</span>
              <input readonly type="text" placeholder="placeholder" class="personal__form-input" value="ivanivanov" />
            </div>
            <div class="personal__form-label">
              <span class="personal__form-title">Имя</span>
              <input readonly type="text" placeholder="placeholder" class="personal__form-input" value="Иван" />
            </div>
            <div class="personal__form-label">
              <span class="personal__form-title">Фамилия</span>
              <input readonly type="text" placeholder="placeholder" class="personal__form-input" value="Иванов" />
            </div>
            <div class="personal__form-label">
              <span class="personal__form-title">Имя</span>
              <input readonly type="text" placeholder="placeholder" class="personal__form-input" value="в чате Иван" />
            </div>
            <div class="personal__form-label">
              <span class="personal__form-title">Телефон</span>
              <input readonly type="text" placeholder="placeholder" class="personal__form-input" value="+7 (909) 967 30 30" />
            </div>
    <!--        <input type="submit" class="submit-button personal__form-submit" value="Сохранить" />-->
          </form>

          <div class="personal-functions">
            <div class="personal__form-label">
              <span class="personal__form-title personal__form-title--blue">Изменить данные</span>
            </div>
            <div class="personal__form-label">
              <span class="personal__form-title personal__form-title--blue">Изменить пароль</span>
            </div>
            <div class="personal__form-label">
              <span class="personal__form-title personal__form-title--alert">Выйти</span>
            </div>
          </div>
        </div>
      </section>
    `);
  }
}
