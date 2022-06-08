import { UserAPI } from 'src/api/User.api';

class UserController {
  #api: UserAPI = new UserAPI();

  static #errorHandler(status: number) {
    if (status !== 200) {
      throw new Error(`${status}`);
    }
  }

  public async update(data: unknown) {
    const { status } = await this.#api.update(data);
    UserController.#errorHandler(status);
  }

  public async updateAvatar(data: XMLHttpRequestBodyInit) {
    const { status } = await this.#api.putAvatar(data);

    UserController.#errorHandler(status);
  }

  public async updatePassword(data: unknown) {
    const { status } = await this.#api.putPassword(data);

    UserController.#errorHandler(status);
  }
}

export const userController = new UserController();
