// language=hbs
import { Block } from '../utils/Block';

export class Registration extends Block {
  render(): string {
    return `
      <section class="root">
        <from class="small-form">
          <div class="small-form__row">
            <h1 class="small-form__header">Регистрация</h1>
            {{> formInput name="email" placeholder="Почта"}}
            {{> formInput name="login" placeholder="Логин"}}
            {{> formInput name="first_name" placeholder="Имя"}}
            {{> formInput name="last_name" placeholder="Фамилия"}}
            {{> formInput name="phone" placeholder="Телефон"}}
            {{> formInput name="password" placeholder="Пароль"}}
            {{> formInput placeholder="Пароль (ещё раз)"}}
          </div>
          <div class="small-form__row">
            <input type="submit" class="submit-button" value="Зарегистрироваться"/>
            <div class="small-link-parent">
              <a href="/auth" class="small-link">Войти</a>
            </div>
          </div>
        </from>
      </section>
    `;
  }
}
