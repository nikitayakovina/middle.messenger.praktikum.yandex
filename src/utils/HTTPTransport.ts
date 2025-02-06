const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

type Options = { method: string; timeout?: number; data?: {} };
type HTTPMethod = <R=unknown>(url: string, options?: Options) => Promise<R>;

export const queryStringify = (data: Record<string, string>) => {
  let result: string = "?";

  const isFirstParam = () => result.split("").reverse()[0] === "?";

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      result += isFirstParam() ? `${key}=${data[key]}` : `&${key}=${data[key]}`;
    } else if (typeof data[key] === "object") {
      result += isFirstParam() ? `${key}=[object Object]` : `&${key}=${data[key]}`;
    } else {
      result += isFirstParam() ? `${key}=${data[key]}` : `&${key}=${data[key]}`;
    }
  });

  return result;
};

export class HTTPTransport {
  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST });

  delete : HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE });

  request = <R>(
    url: string,
    options: Options = { method: "GET", timeout: 5000 },
  ): Promise<R> => {
    const { method, data } = options;
    const xhr = new XMLHttpRequest();
    const queryParams = queryStringify(data || "");

    return new Promise<R>((resolve, reject) => {
      xhr.open(method, url + queryParams);
      xhr.setRequestHeader("Content-Type", "text/plain");

      xhr.onload = () => resolve(xhr as R);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
