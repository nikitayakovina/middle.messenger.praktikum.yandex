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

  addUserChat(chatId: number, userId: number) {
    return this.update('/users', { data: { chatId, users: [userId] } });
  }
}
export default new ChatsAPI();