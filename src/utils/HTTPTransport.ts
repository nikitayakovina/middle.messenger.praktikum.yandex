const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
export const BASE_URL = "https://ya-praktikum.tech/api/v2";
export const BASE_URL_RESOURCE = "https://ya-praktikum.tech/api/v2/resources";

type Options = {
  method: string;
  timeout?: number;
  data?: Record<
    string,
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | Record<string, string | number | boolean>
  > | null;
};
type HTTPMethod = <R>(
  url: string,
  options?: Pick<Options, "timeout" | "data">,
) => Promise<R>;
type PrimitiveValue = string | number | boolean;
type DataValue =
  | PrimitiveValue
  | PrimitiveValue[]
  | Record<string, PrimitiveValue | PrimitiveValue[]>;
type RecordData = Record<string, DataValue>;

export const queryStringify = (data: RecordData | null): string | never => {
  let result: string = "";

  if (data) {
    Object.keys(data).forEach((key: string, index: number) => {
      const value = data[key];
      if (index > 0) {
        result += "&";
      }
      if (Array.isArray(value)) {
        (value as PrimitiveValue[]).forEach((k, i) => {
          result += `${key}[${i}]=${k}`;
          if (value.length - i !== 1) {
            result += "&";
          }
        });
      } else if (typeof value === "object" && value !== null) {
        const recGetValue = (dataValue: DataValue, keyDataValue: string): string => {
          if (typeof dataValue === "object" && dataValue !== null) {
            return Object.keys(dataValue)
              .map((k: string) =>recGetValue((dataValue as Record<string, PrimitiveValue | PrimitiveValue[]>)[k],`${keyDataValue}[${k}]`))
              .join("&");
          }
          return `${keyDataValue}=${dataValue}`;
        };
        result += recGetValue(value, key);
      } else {
        result += `${key}=${value}`;
      }
    });
  }
  return result;
};

export class HTTPTransport {
  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE });

  request = <R>(
    url: string,
    options: Options = { method: METHODS.GET, timeout: 5000 },
  ): Promise<R> => {
    const { method, data } = options;
    const xhr = new XMLHttpRequest();
    const queryParams = data ? queryStringify(data) : "";

    return new Promise<R>((resolve, reject) => {
      xhr.open(
        method,
        BASE_URL + url + (method === METHODS.GET ? queryParams : ""),
      );
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
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
