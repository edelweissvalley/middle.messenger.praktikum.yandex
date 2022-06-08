export function checkEmptyFocus(values: { [key: string]: unknown }, name: string, eventName: string): string {
  const value: string = Reflect.get(values, name) as string || '';

  if (!value.length && eventName === 'focus') {
    return '';
  }

  return value.length ? '' : 'Поле обязательно';
}

export function checkLogin(values: { [key: string]: unknown }, name: string): string {
  const value: string = Reflect.get(values, name) as string || '';

  if (value.length < 3) {
    return 'Логин должен быть не менее 3-х символов';
  }

  if (value.length > 20) {
    return 'Логин должен быть не боле 20-ти символов';
  }

  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return 'Допустимые символы: латинские буквы/цифры/_/-';
  }

  return value.length ? '' : 'Не введено поле';
}

const password = /^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*\d)+)(?=(.*\W)+)(?!.*\s).{8,40}$/;

export function checkPassword(values: { [key: string]: unknown }, name: string): string {
  const value: string = Reflect.get(values, name) as string || '';

  return password.test(value) ? '' : 'Некорректно введён пароль';
}

export function checkPasswordRepeat(values: { [key: string]: unknown }, name: string): string {
  const value: string = Reflect.get(values, name) as string || '';
  const valueOriginal: string = Reflect.get(values, 'password') as string || '';

  return value === valueOriginal ? '' : 'Некорректно введён пароль';
}

export function checkMail(values: { [key: string]: unknown }, name: string): string {
  const value: string = Reflect.get(values, name) as string || '';

  return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value) ? '' : 'Некорректный e-mail';
}
