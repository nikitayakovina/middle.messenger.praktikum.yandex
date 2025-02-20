import { BaseAPI } from './baseAPI';

class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChats() {
    return this.request('');
  }

  createChat(data: any) {
    return this.create('', data);
  }

  getToken(id: number) {
    return this.create(`/token/${id}`, {})
  }
}
export default new ChatsAPI();