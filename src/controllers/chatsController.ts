import Store from "../utils/store";
import ChatsAPI from "../api/chatsAPI";

class ChatsController {
  async getChats() {
    try {
      const chats = await ChatsAPI.getChats() as [];
      const chatsWithTokens = await Promise.all(chats.map(async (chat: any) => (
        {
          ...chat,
          token: await this.getToken(chat.id)
        })
      ));

      Store.set("chats", chatsWithTokens);
    } catch (e) {
      console.error(e);
    }
  }

  async createChat(data: any) {
    try {
      await ChatsAPI.createChat(data)
        .then(() => this.getChats())
    } catch (e) {
      console.error(e);
    }
  }

  async getToken(id: number) {
    try {
      return ChatsAPI.getToken(id)
        .then((data: any) => data.token)
    } catch (e) {
      console.error(e);
    }
  }
}
export default new ChatsController();