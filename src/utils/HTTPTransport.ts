const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

type Options = { method: string; timeout: number; data?: {} };

export const queryStringify = (data: Record<string, string>) => {
  let result: string = "?";

  const isFirstParam = () => {
    return result.split("").reverse()[0] === "?";
  };

  for (let key in data) {
    if (Array.isArray(data[key])) {
      if (isFirstParam()) {
        result += `${key}=${data[key]}`;
      } else {
        result += `&${key}=${data[key]}`;
      }
    } else if (typeof data[key] === "object") {
      if (isFirstParam()) {
        result += `${key}=[object Object]`;
      } else {
        result += `&${key}=${data[key]}`;
      }
    } else {
      if (isFirstParam()) {
        result += `${key}=${data[key]}`;
      } else {
        result += `&${key}=${data[key]}`;
      }
    }
  }

  return result;
};

export class HTTPTransport {
  get = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  put = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };
  post = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };
  delete = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };
  request = (
    url: string,
    options: Options = { method: "GET", timeout: 5000 },
  ) => {
    const { method, data } = options;
    const xhr = new XMLHttpRequest();
    const queryParams = queryStringify(data || "");

    return new Promise((resolve, reject) => {
      xhr.open(method, url + queryParams);
      xhr.setRequestHeader("Content-Type", "text/plain");

      xhr.onload = function () {
        resolve(xhr);
      };

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
