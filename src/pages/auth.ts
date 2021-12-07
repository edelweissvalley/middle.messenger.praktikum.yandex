// language=hbs
import { Block } from '../utils/Block';

export class Auth extends Block {
  render(): string {
    return `
      <section class="root">
        <from class="small-form">
          <div class="small-form__row">
            <h1 class="small-form__header">Вход</h1>
            {{> formInput name="login" placeholder="Логин"}}
            {{> formInput name="password" placeholder="Пароль"}}
          </div>
          <div class="small-form__row">
            <input type="submit" class="submit-button" value="Авторизоваться"/>
            <div class="small-link-parent">
              <a href="/registration" class="small-link">Нет аккаунта?</a>
            </div>
          </div>
        </from>
      </section>
    `;
  }
}
