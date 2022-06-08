enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

interface RequestOptions {
  timeout?: number;
  headers?: Record<string, string>;
  method?: Methods;
  data?: Document | XMLHttpRequestBodyInit | null;
  withCredentials?: boolean;
  responseType?: string;
}

export class Fetch {
  static #instance: Fetch;

  constructor() {
    if (Fetch.#instance) {
      return Fetch.#instance;
    }

    Fetch.#instance = this;
  }

  public get = this.#method(Methods.get);
  public post = this.#method(Methods.post);
  public put = this.#method(Methods.put);
  public delete = this.#method(Methods.delete);

  #method(method: Methods): (url: string, options?: RequestOptions) => Promise<XMLHttpRequest> {
    return (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
      return this.#request(url, { ...options, method }, options.timeout);
    };
  }

  #request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        return reject('No method');
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = (): void => {
        resolve(xhr);
      };

      xhr.withCredentials = true;
      xhr.responseType = 'json';
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.send(data);
    });
  };
}
