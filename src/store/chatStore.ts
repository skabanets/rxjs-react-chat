import { BehaviorSubject, map } from 'rxjs';

import { type Message, Sender } from '../types';

const loadMessagesFromStorage = (): Message[] => {
  const savedMessages = localStorage.getItem('chat-storage');
  return savedMessages
    ? JSON.parse(savedMessages).map((msg: Message) => ({ ...msg, date: new Date(msg.date) }))
    : [];
};

const saveMessagesToStorage = (messages: Message[]) => {
  const messagesWithDateAsString = messages.map(msg => ({
    ...msg,
    date: msg.date.toISOString(),
  }));
  localStorage.setItem('chat-storage', JSON.stringify(messagesWithDateAsString));
};

const messageSubject$ = new BehaviorSubject<Message[]>(loadMessagesFromStorage());

const getMessages = () => messageSubject$.asObservable();

const getUnreadCount = () =>
  messageSubject$.pipe(map(messages => messages.filter(msg => msg.unread).length));

const addNewMessage = (text: string, sender: Sender) => {
  const newMessage: Message = {
    text,
    sender,
    unread: sender === Sender.Chatbot,
    date: new Date(),
  };

  const currentMessages = messageSubject$.getValue();
  const updatedMessages = [
    ...(sender === Sender.User
      ? currentMessages.map(msg => ({ ...msg, unread: false }))
      : currentMessages),
    newMessage,
  ];

  messageSubject$.next(updatedMessages);

  saveMessagesToStorage(updatedMessages);
};

const markAllAsRead = () => {
  const updatedMessages = messageSubject$.getValue().map(msg => ({ ...msg, unread: false }));
  messageSubject$.next(updatedMessages);

  saveMessagesToStorage(updatedMessages);
};

const clearChat = () => {
  messageSubject$.next([]);
  localStorage.removeItem('chat-storage');
};

export { messageSubject$, getMessages, getUnreadCount, addNewMessage, clearChat, markAllAsRead };
