import { HTTPTransport } from "../utils/HTTPTransport";

export class BaseAPI {
  _httpTransport: HTTPTransport = new HTTPTransport();
  _endpoint: string = "";

  constructor(endPoint: string) {
    if (endPoint !== this._endpoint) {
      this._endpoint = endPoint;
    }
  }

  create(url: string, data: {}) {
    return this._httpTransport.post(this._endpoint + url, { data });
  }

  request(url: string, data?: {}) {
    return this._httpTransport.get(this._endpoint + url, { ...data });
  }

  update(url: string, data: {}) {
    return this._httpTransport.put(this._endpoint + url, data);
  }

  delete(url: string, id: string | number) {
    return this._httpTransport.delete(this._endpoint + url, { data: { id } });
  }
}