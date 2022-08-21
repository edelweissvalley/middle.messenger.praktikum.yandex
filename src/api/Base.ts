import { Fetch } from 'src/utils/fetch';

const errorMessage = 'Не определён';

type Data = Record<string, string>;

export function queryStringify(data: Data): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
}

export class BaseAPI {
  protected static apiURL = 'https://ya-praktikum.tech/api/v2';
  readonly fetch = new Fetch();

  protected static headers = { 'Content-Type': 'application/json' };

  public urlGetMethod(url: string, data: Data): string {
    return `${url}${queryStringify(data)}`;
  }

  public request(): Promise<void> {
    throw new Error(errorMessage);
  }

  public delete(): Promise<void> {
    throw new Error(errorMessage);
  }
}
