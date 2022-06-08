import { ChatSocket } from 'src/utils/ChatSocket';
import { Component } from 'src/utils/Component';
import { EventBus } from 'src/utils/event-bus';
import { Indexed, set } from 'src/utils/helpers';

export enum StoreEvents {
  updated = 'updated',
}

export function connect(
  Block: typeof Component<any>, mapStateToProps: (state: Indexed) => Indexed = (state: Indexed) => state
): typeof Component<any> {
  return class extends Block {
    constructor(tagName: keyof HTMLElementTagNameMap | undefined, props: IState) {
      super(tagName, { ...props, ...mapStateToProps(store.getState()) });

      store.eventBus.on(StoreEvents.updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}

class Store<S> extends EventBus {
  public eventBus: EventBus = new EventBus();
  readonly #state: S;

  constructor(s: S) {
    super();
    this.#state = s;
  }

  public getState(): S {
    return this.#state;
  }

  public set(path: string, value: unknown): void {
    set(this.#state, path, value);
    this.eventBus.emit(StoreEvents.updated);
  }
}

export interface IChat {
  socket?: ChatSocket;
  avatar: string;
  created_by: number;
  id: number;
  title: string;
  unread_count: number;
  last_message: {
    time: string;
    user: {
      avatar: string;
      display_name: string;
      email: string;
      first_name: string;
      login: string;
      phone: string;
      second_name: string;
    },
  } | null,
}

export interface IMessage {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: null;
}

export interface IState {
  personal?: Record<string, string>;
  user?: {
    id?: number;
    avatar?: string;
    display_name?: string;
    email?: string;
    first_name?: string;
    login?: string;
    phone?: string
    second_name?: string;
  };
  chats: {
    messages: IMessage[];
    chatsList: IChat[];
    currentChat: null | number;
    modalCreateChat?: boolean;
    modalUserAdd?: boolean;
    modalUserDelete?: boolean;
    options: boolean;
  };
}

export interface IStore<S> {
  eventBus: EventBus;
  getState(): S;
  set(path: string, value: unknown): void;
}

export enum StorePaths {
  modalCreateChat = 'chats.modalCreateChat',
  modalAddUser = 'chats.modalUserAdd',
  modalDeleteUser = 'chats.modalUserDelete',
}

export const store: IStore<IState> = new Store<IState>({
  chats: {
    messages: [],
    currentChat: null,
    chatsList: [],
    options: false,
    modalUserAdd: false,
    modalUserDelete: false,
  },
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;
