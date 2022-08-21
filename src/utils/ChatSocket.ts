import { IMessage, store } from 'src/utils/Store';

export class ChatSocket {
  socket: WebSocket;
  private static chatsUrl = 'wss://ya-praktikum.tech/ws/chats';

  constructor(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(`${ChatSocket.chatsUrl}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      console.info('Соединение установлено');

      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    this.socket.addEventListener('close', (event: CloseEvent) => {
      if (event.wasClean) {
        console.info('Соединение закрыто чисто');
      } else {
        console.error('Обрыв соединения');
      }

      console.info(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event: MessageEvent<string>) => {
      console.info('Получены данные', event.data);
      const currentUserId = store.getState()?.user?.id;
      const data = JSON.parse(event.data);

      function messageHandler(item: IMessage) {
        return {
          ...item,
          time: new Date(item.time).toLocaleTimeString(),
          day: new Date(item.time).toDateString(),
          type: currentUserId === item.user_id ? 'outgoing' : 'incoming',
        };
      }

      if (Array.isArray(data)) {
        store.set('chats.messages', (data as IMessage[])?.map(messageHandler).reverse());
      } else {
        const messages = store.getState().chats.messages.concat(messageHandler(data as IMessage));
        store.set('chats.messages', messages);
      }
    });

    this.socket.addEventListener('error', (event: Event) => {
      console.error('Ошибка', event);
    });
  }
}
