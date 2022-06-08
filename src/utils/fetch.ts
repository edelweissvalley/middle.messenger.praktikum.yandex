enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

function queryStringify(data: Document | { [key: string]: string }): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return '?' + Object.keys(data).map(key => `${key}=${(data as { [key: string]: string })[key]}`).join('&');
}

interface RequestOptions {
  timeout?: number;
  headers?: Record<string, string>;
  method?: Methods;
  data?: Document | null;
}

export class Fetch {
  public get = this.#method(Methods.get);
  public post = this.#method(Methods.post);
  public put = this.#method(Methods.put);
  public delete = this.#method(Methods.delete);

  #method(method: Methods): (url: string, options: RequestOptions) => Promise<XMLHttpRequest> {
    return (url: string, options: RequestOptions): Promise<XMLHttpRequest> => {
      return this.#request(url, { ...options, method }, options.timeout);
    };
  }

  #request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');

        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.get;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = (): void => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
