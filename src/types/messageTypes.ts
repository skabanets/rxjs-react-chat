enum Sender {
  User = 'user',
  Chatbot = 'chatbot',
}

interface Message {
  sender: Sender;
  text: string;
  unread: boolean;
  date: Date;
}

export { Sender, type Message };
