import { ChatsAPI } from 'src/api/Chats';
import { Paths, Router } from 'src/utils/Router';
import { store } from 'src/utils/Store';

class ChatsController {
  #api: ChatsAPI = new ChatsAPI();

  async create(data: unknown): Promise<void> {
    await this.#api.create(data);
  }

  public async get(): Promise<void> {
    const response: XMLHttpRequest = await this.#api.get();
    store.set(
      'chats',
      {
        chatsList: response.response ,
        currentChat: response?.response?.length ? 0 : null,
      }
    );
  }

  public async addUser(data: unknown): Promise<void> {
    await this.#api.putUser(data);
  }

  public async deleteUser(data: unknown): Promise<void> {
    await this.#api.deleteUser(data);
  }

  public setCurrentChat(current_chat: unknown): void {
    store.set('activeChat', current_chat);
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
