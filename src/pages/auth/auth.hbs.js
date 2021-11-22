// language=hbs

export default `
  <section class="root">
    <from class="small-form">
      <div class="small-form__row">
        <header class="small-form__header">Вход</header>
        <div class="small-form__input-parent">
          <input type="text" name="login" class="small-form__input" placeholder="Логин">
          <span class="small-form__input-title">Логин</span>
        </div>
        <div class="small-form__input-parent">
          <input type="password" name="password" class="small-form__input" placeholder="Пароль">
            <span class="small-form__input-title">Пароль</span>
        </div>
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
