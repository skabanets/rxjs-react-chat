export enum Sender {
  User = 'user',
  Chatbot = 'chatbot',
}

export interface Message {
  sender: Sender;
  text: string;
  unread: boolean;
  date: Date;
}
