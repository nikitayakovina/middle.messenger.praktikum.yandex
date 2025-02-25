import Store from "../utils/store.ts";
import ChatsAPI from "../api/chatsAPI.ts";
import WebSocketTransport from "../utils/webSocketTransport.ts";
import { IChat, IToken } from "../models/chat.ts";
import { StoreEnum } from "../models/store.ts";
import { IMessage } from "../models/message.ts";
import { IUser } from "../models/user.ts";
import { IChatUser } from "../models/profile.ts";

class ChatsController {
  _sortedMessages = (message: IMessage[]) => {
    return message
      .filter((m) => m?.type === "message")
      .sort((prev, next) => new Date(prev.time).getTime() - new Date(next.time).getTime());
  }

  async getChats() {
    try {
      await ChatsAPI.getChats().then((chats) => {
        Store.set(StoreEnum.CHATS, chats);
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createChat(data: Pick<IChat, "title"> & { userId: number }) {
    try {
      await ChatsAPI.createChat(data)
        .then((chat: IChat) => this.addUserChat(chat.id, data.userId))
        .then(() => this.getChats())
    } catch (e) {
      console.error(e);
    }
  }

  async getToken(id: number) {
    try {
      return ChatsAPI.getToken(id)
        .then((data: IToken) => data.token)
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async sendMessage(chatId: number, message: string) {
    try {
      this.getToken(chatId).then(token => {
        if (token) {
          const { user } = (Store.getState() as { user: IUser });

          const socket = WebSocketTransport.getWebSocket(user.id, chatId, token);

          socket.addEventListener("open", () => {
            socket.send(
              JSON.stringify({
                content: message,
                type: "message",
              })
            );
          });
  
          socket.addEventListener("message", (event: MessageEvent) => {
            const data = JSON.parse(event.data) as IMessage[] | IMessage;
            const { messages } = Store.getState();
    
            if (Array.isArray(data)) {
              Store.set(StoreEnum.MESSAGE, this._sortedMessages(data));
            } else if (data.type === "message") {
              Store.set(StoreEnum.MESSAGE, [...(messages as IMessage[]), data]);
            }
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getMessages(id: number) {
    try {
      this.getToken(id).then(token => {
        if (token) {
          const { user } = (Store.getState() as { user: IUser })
          const socket = WebSocketTransport.getWebSocket(user.id, id, token);
          let interval = setInterval(() => {
            socket.send(JSON.stringify({ type: "ping" }))
          }, 5000);

          socket.addEventListener("open", () => {
            socket.send(
              JSON.stringify({
                content: "0",
                type: "get old",
              })
            );
          });
          
          socket.addEventListener("message", event => {
            const data = JSON.parse(event.data) as IMessage[] | IMessage;
  
            if (Array.isArray(data)) {
                Store.set(StoreEnum.MESSAGE, this._sortedMessages(data));
            } else if (data.type === "message") {
              Store.set(StoreEnum.MESSAGE, [data]);
            }
          });

          socket.addEventListener("close", () => {
            clearInterval(interval);
            interval = 0;
          });
        }
      })
    } catch (e) {
      console.error(e);
    }
  }

  async addUserChat(chatId: number, userId: number) {
    try {
      return ChatsAPI.addUserChat(chatId, userId)
        .then(() => {
          this.getChatUsers(chatId);
        });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async removeUserChat(chatId: number, userId: number) {
    try {
      ChatsAPI.removeUserChat(chatId, userId)
        .then(() => {
          this.getChats();
          this.getChatUsers(chatId);
          const { usersChat } = Store.getState();

          if (!(usersChat as IChatUser[]).length) {
            Store.set(StoreEnum.SELECTED_CHAT_ID, undefined);
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  async getChatUsers(chatId: number) {
    try {
      ChatsAPI.getChatUsers(chatId)
        .then((user) => {
          Store.set(StoreEnum.USERS_CHAT, user);
        });
    } catch (e) {
      console.error(e);
    }
  }
}
export default new ChatsController();
