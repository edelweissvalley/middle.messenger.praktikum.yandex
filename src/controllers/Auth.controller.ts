import { AuthAPI } from 'src/api/Auth.api';
import { Paths, Router } from 'src/utils/Router';
import { store } from 'src/utils/Store';

class AuthController {
  #api: AuthAPI = new AuthAPI();

  async signUp(data: unknown): Promise<void> {
    const response = await this.#api.signUp(data);

    if (response.status == 200) {
      store.set('user', response?.response);
      Router.instance.go(Paths.chats);
    } else {
      throw new Error(`${response.status}`);
    }
  }

  async signIn(data: unknown): Promise<void> {
    const { status } = await this.#api.signIn(data);

    if (status == 200) {
      Router.instance.go(Paths.chats);
    } else {
      throw new Error(`${status}`);
    }
  }

  async logout(): Promise<void> {
    const { status } = await this.#api.logout();

    if (status !== 200) {
      throw new Error(`${status}`);
    }

    store.set('user', null);

    Router.instance.go(Paths.auth);
  }

  async getUser(): Promise<void> {
    const response = await this.#api.getUser();

    if (response.status == 200) {
      store.set('user', response?.response);
    } else {
      throw new Error(`${response.status}`);
    }
  }
}

export const authController = new AuthController();
