import Store from "../utils/store";
import ChatsAPI from "../api/chatsAPI";
import WebSocketTransport from "../utils/webSocketTransport";

class ChatsController {
  async getChats() {
    try {
      await ChatsAPI.getChats().then((chats) => {
        Store.set("chats", chats);
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createChat(data: any) {
    try {
      await ChatsAPI.createChat(data)
        .then((chat: any) => this.addUserChat(chat.id, data.userId))
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

  async sendMessage(chatId: number, message: string) {
    try {
      this.getToken(chatId).then(token => {
        //@ts-ignore 
        const socket = WebSocketTransport.getWebSocket(Store.getState()?.user?.id, chatId, token);

        socket.addEventListener("open", () => {
          socket.send(
            JSON.stringify({
              content: message,
              type: "message",
            })
          );
        });

        socket.addEventListener("message", (event: any) => {
          const { messages } = Store.getState();
  
          if (Array.isArray(JSON.parse(event.data))) {
            const data = JSON.parse(event.data).sort(
              (prev: any, next: any) =>
                new Date(prev.time).getTime() - new Date(next.time).getTime()
            );
  
            Store.set("messages", data);
          } else {
            //@ts-ignore
            Store.set("messages", [...messages, JSON.parse(event.data)]);
          }
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  async getMessages(id: number) {
    try {
      this.getToken(id).then(token => {
        //@ts-ignore 
        const socket = WebSocketTransport.getWebSocket(Store.getState()?.user?.id, id, token);

        socket.addEventListener('open', () => {
          socket.send(
            JSON.stringify({
              content: "0",
              type: "get old",
            })
          );
        });
        
        socket.addEventListener('close', event => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }
        
          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        
        socket.addEventListener('message', event => {
          const data = JSON.parse(event.data).sort(
            (prev: any, next: any) =>
              new Date(prev.time).getTime() - new Date(next.time).getTime()
          );
  
          Store.set("messages", data);
        });
        
        // socket.addEventListener('error', event => {
        //   console.log('Ошибка', event.message);
        // }); 
      })
    } catch (e) {
      console.error(e);
    }
  }

  async addUserChat(chatId: number, userId: number) {
    try {
      return ChatsAPI.addUserChat(chatId, userId);
    } catch (e) {
      console.error(e);
    }
  }
}
export default new ChatsController();