type TCallBack = (...args: unknown[]) => void;

export class EventBus {
  listeners: { [key: string]: TCallBack[] } = {};

  on(event: string, callback: TCallBack): void {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  }

  off(event: string, callback: TCallBack): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: TCallBack) => {
      listener(...args);
    });
  }
}
