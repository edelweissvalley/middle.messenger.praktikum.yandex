// language=hbs

export default `
  <section class="root">
    <from class="small-form">
      <div class="small-form__row">
        <header class="small-form__header">Регистрация</header>
        <div class="small-form__input-parent">
          <input type="text" name="login" class="small-form__input" placeholder="Почта">
          <span class="small-form__input-title">Почта</span>
        </div>
        <div class="small-form__input-parent">
          <input type="text" name="login" class="small-form__input" placeholder="Логин">
          <span class="small-form__input-title">Логин</span>
        </div>
        <div class="small-form__input-parent">
          <input type="text" name="login" class="small-form__input" placeholder="Имя">
          <span class="small-form__input-title">Имя</span>
        </div>
        <div class="small-form__input-parent">
          <input type="text" name="login" class="small-form__input" placeholder="Фамилия">
          <span class="small-form__input-title">Фамилия</span>
        </div>
        <div class="small-form__input-parent">
          <input type="text" name="login" class="small-form__input" placeholder="Телефон">
          <span class="small-form__input-title">Телефон</span>
        </div>
        <div class="small-form__input-parent">
          <input type="password" name="password" class="small-form__input" placeholder="Пароль">
          <span class="small-form__input-title">Пароль</span>
        </div>
        <div class="small-form__input-parent">
          <input type="password" name="password" class="small-form__input" placeholder="Пароль (ещё раз)">
          <span class="small-form__input-title">Пароль (ещё раз)</span>
        </div>
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
