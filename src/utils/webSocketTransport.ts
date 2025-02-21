class WebSocketTransport {
  getWebSocket(userId: number, chatId: number, token: string): WebSocket {
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;

    return new WebSocket(url);
  }
}
export default new WebSocketTransport();