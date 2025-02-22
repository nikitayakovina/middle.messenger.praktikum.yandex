const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
export const BASE_URL = "https://ya-praktikum.tech/api/v2";
export const BASE_URL_RESOURCE = "https://ya-praktikum.tech/api/v2/resources";

type Options = { method: string; timeout?: number; data?: {} };
type HTTPMethod = <R=unknown>(url: string, options?: Pick<Options, "timeout" | "data">) => Promise<R>;

// export const queryStringify = (data: Record<string, string>) => {
//   let result: string = "?";

//   const isFirstParam = () => result.split("").reverse()[0] === "?";

//   Object.keys(data).forEach((key) => {
//     if (Array.isArray(data[key])) {
//       result += isFirstParam() ? `${key}=${data[key]}` : `&${key}=${data[key]}`;
//     } else if (typeof data[key] === "object") {
//       result += isFirstParam() ? `${key}=[object Object]` : `&${key}=${data[key]}`;
//     } else {
//       result += isFirstParam() ? `${key}=${data[key]}` : `&${key}=${data[key]}`;
//     }
//   });

//   return result;
// };

export const queryStringify = (data: Record<string, any>): string | never => {
  let result: string = "";
  
  Object.keys(data).forEach((key, index) => {
    if (index > 0) result += "&";
    
    if (Array.isArray(data[key])) {
      data[key].forEach((k: string, i: number) => {
        result += `${key}[${i}]=${k}`;
        if (data[key].length - i !== 1) result += "&";
      })
    } else if (typeof data[key] === "object" && data[key] !== null) {
        const recGetValue = (value: any, key: string): string => {
          if (typeof value === "object" && value !== null) {
            return Object.keys(value)
              .map((k: string) => recGetValue(value[k], `${key}` + '[' + `${k}` + ']'))
              .join("&");
          }
          return `${key}=${value}`;
        };
      
        result += recGetValue(data[key], key);
    } else {
      result += `${key}=${data[key]}`;
    }
  });
  
  return result;
}

export class HTTPTransport {
  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST });

  delete : HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE });

  request = <R>(
    url: string,
    options: Options = { method: METHODS.GET, timeout: 5000 },
  ): Promise<R> => {
    const { method, data } = options;
    const xhr = new XMLHttpRequest();
    const queryParams = queryStringify(data || "");

    return new Promise<R>((resolve, reject) => {
      xhr.open(method, BASE_URL + url + (method === METHODS.GET ? queryParams : ""));

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send((data instanceof FormData) ? data : JSON.stringify(data));
      }
    });
  };
}
