import { IChat, IToken } from '../models/chat';
import { IChatUser } from '../models/profile';
import { BaseAPI } from './baseAPI';

class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChats() {
    return this.request('');
  }

  createChat(data: Pick<IChat, "title"> & { userId: number }) {
    return this.create<typeof data, IChat>('', data);
  }

  getToken(id: number) {
    return this.create<IToken>(`/token/${id}`)
  }

  addUserChat(chatId: number, userId: number) {
    return this.update('/users', { chatId, users: [userId] });
  }

  removeUserChat(chatId: number, userId: number) {
    return this.delete('/users', { chatId, users: [userId]});
  }

  getChatUsers(chatId: number) {
    return this.request<IChatUser>(`/${chatId}/users`);
  }
}
export default new ChatsAPI();