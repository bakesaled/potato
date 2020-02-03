import { Message } from './message';
import { List } from './list';
import { logger } from './app';

export class EventBus {
  private messages: Map<string, List<Message>> = new Map<
    string,
    List<Message>
  >();
  broadcast(messageName: string, controllerId?: string, ...params: any[]) {
    if (this.messages.has(messageName)) {
      const typeMessages = this.messages.get(messageName);

      for (let i = 0; i < typeMessages.count(); i++) {
        const message = typeMessages.toArray()[i] as Message;
        if (message.controllerId) {
          if (message.controllerId === controllerId) {
            logger.debug('broadcast', messageName);
            message.callback(params);
          }
        } else {
          message.callback(params);
        }
      }
    } else {
      logger.warn(
        'no messages found',
        messageName,
        controllerId,
        this.messages
      );
    }
  }
  listen(
    messageName: string,
    controllerId: string,
    callback: (...params: any[]) => void
  ) {
    if (!this.messages.has(messageName)) {
      this.messages.set(messageName, new List<Message>());
    }

    this.messages.get(messageName).add(new Message(controllerId, callback));
  }
  removeMessages(controllerId: string) {
    for (let key in this.messages) {
      for (let i = 0; i < this.messages.get(key).count(); i++) {
        const message = this.messages.get(key).toArray()[i];
        if (message.controllerId === controllerId) {
          this.messages.get(key).removeAt(i);
        }
      }
    }
  }
}
