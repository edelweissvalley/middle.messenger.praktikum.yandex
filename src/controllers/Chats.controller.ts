import { ChatsAPI } from 'src/api/Chats';
import { ChatSocket } from 'src/utils/ChatSocket';
import { Paths, Router } from 'src/utils/Router';
import { IChat, store } from 'src/utils/Store';

class ChatsController {
  #api: ChatsAPI = new ChatsAPI();

  async getChatToken(id: number): Promise<string> {
    return await this.#api.getChatToken(id);
  }

  async create(data: unknown): Promise<XMLHttpRequest> {
    return await this.#api.create(data);
  }

  public async get(): Promise<void> {
    const { response }: XMLHttpRequest = await this.#api.get();
    const storeCurrentChat = store.getState().chats.currentChat;

    const currentChatNumber = typeof storeCurrentChat === 'number'
      ? storeCurrentChat + 1
      : (response?.length ? 0 : null);

    if (typeof currentChatNumber === 'number') {
      const currentChat = (response as IChat[])?.[currentChatNumber];

      currentChat.socket = new ChatSocket(
        store.getState().user?.id as number,
        currentChat.id,
        await this.getChatToken(currentChat.id)
      );

      store.set('chats', { chatsList: response, currentChat: currentChatNumber });
    }
  }

  public async addUser(data: unknown): Promise<XMLHttpRequest> {
    return await this.#api.putUser(data);
  }

  public async deleteUser(data: unknown): Promise<XMLHttpRequest> {
    return await this.#api.deleteUser(data);
  }

  public async getChatUsers(id: string): Promise<void> {
    const response = await this.#api.getChatUsers(id);

    const participants: unknown = response.response;
    // const activeChat = await store.getState().activeChat;
    store.set('activeChat', { /*...activeChat,*/ participants });
  }

  async updateAvatar(data: Document | XMLHttpRequestBodyInit | null | undefined): Promise<void> {
    await this.#api.putAvatar(data);

    Router.instance.go(Paths.chats);
  }

}

export const chatsController = new ChatsController();
