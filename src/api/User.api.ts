import { BaseAPI } from 'src/api/Base';

export class UserAPI extends BaseAPI {
  static #getEndPoint(path: string): string {
    return `${BaseAPI.apiURL}/user${path}`;
  }

  public update(data: unknown): Promise<XMLHttpRequest> {
    return this.fetch.put(UserAPI.#getEndPoint('/profile'), {
      data: JSON.stringify(data),
      headers: BaseAPI.headers,
    });
  }

  public putAvatar(data: XMLHttpRequestBodyInit): Promise<XMLHttpRequest> {
    return this.fetch.put(UserAPI.#getEndPoint('/profile/avatar'), { data });
  }

  public putPassword(data: unknown): Promise<XMLHttpRequest> {
    return this.fetch.put(UserAPI.#getEndPoint('/password'), {
      data: JSON.stringify(data),
      headers: BaseAPI.headers,
    });
  }
}
