import { BaseAPI } from 'src/api/Base';

export class ChatsAPI extends BaseAPI {
  static #getEndPoint(path: string): string {
    return `${BaseAPI.apiURL}/chats${path}`;
  }

  public create(data: unknown): Promise<XMLHttpRequest> {
    return this.fetch.post(ChatsAPI.#getEndPoint('/'), {
      data: JSON.stringify(data),
      headers: BaseAPI.headers,
    });
  }

  public get(): Promise<XMLHttpRequest> {
    return this.fetch.get(ChatsAPI.#getEndPoint('/'));
  }

  public putUser(data: unknown): Promise<XMLHttpRequest> {
    return this.fetch.put(ChatsAPI.#getEndPoint('/users'), {
      data: JSON.stringify(data),
      headers: BaseAPI.headers,
    });
  }

  public deleteUser(data: unknown): Promise<XMLHttpRequest> {
    return this.fetch.delete(ChatsAPI.#getEndPoint('/users'), {
      data: JSON.stringify(data),
      headers: BaseAPI.headers,
    });
  }

  public getChatUsers(id: string): Promise<XMLHttpRequest> {
    return this.fetch.get(ChatsAPI.#getEndPoint(`/${id}/users`));
  }

  public async getChatToken(id: number): Promise<string> {
    return await this.fetch.post(ChatsAPI.#getEndPoint(`/token/${id}`))
      .then(({ response: { token } }: { response: { token: string } }) => token);
  }

  public putAvatar(data: Document | XMLHttpRequestBodyInit | null | undefined): Promise<XMLHttpRequest> {
    return this.fetch.put(ChatsAPI.#getEndPoint('/avatar'), { data });
  }
}
