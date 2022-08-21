import { BaseAPI } from 'src/api/Base';

export class AuthAPI extends BaseAPI {
  static #getEndPoint(path: string): string {
    return `${BaseAPI.apiURL}/auth${path}`;
  }

  public signUp(data: unknown): Promise<XMLHttpRequest> {
    return this.fetch.post(AuthAPI.#getEndPoint('/signup'), {
      data: JSON.stringify(data),
      headers: BaseAPI.headers,
    });
  }

  public signIn(data: unknown): Promise<XMLHttpRequest> {
    return this.fetch.post(AuthAPI.#getEndPoint('/signin'), {
      data: JSON.stringify(data),
      headers: BaseAPI.headers,
    });
  }

  public logout(): Promise<XMLHttpRequest> {
    return this.fetch.post(AuthAPI.#getEndPoint('/logout'));
  }

  public getUser(): Promise<XMLHttpRequest> {
    return this.fetch.get(AuthAPI.#getEndPoint('/user'));
  }
}
