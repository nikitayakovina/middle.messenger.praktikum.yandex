import { HTTPTransport } from "../utils/HTTPTransport.ts";

export class BaseAPI {
  _httpTransport: HTTPTransport = new HTTPTransport();
  
  _endpoint: string = "";

  constructor(endPoint: string) {
    if (endPoint !== this._endpoint) {
      this._endpoint = endPoint;
    }
  }

  create<T, R = never>(url: string, data?: T) {
    return this._httpTransport.post<R>(this._endpoint + url, { ...data });
  }

  request<T>(url: string, data?: T) {
    return this._httpTransport.get<T>(this._endpoint + url, { ...data });
  }

  update<T>(url: string, data?: T) {
    return this._httpTransport.put<T>(this._endpoint + url, { ...data });
  }

  delete<T>(url: string, data?: T) {
    return this._httpTransport.delete<T>(this._endpoint + url, { ...data });
  }
}
