import { useEffect, useState } from 'react';

import { Header, MessageControlPanel, MessagesStream } from '../components';

import { addNewMessage, clearChat, getMessages, markAllAsRead } from '../store';
import { type Message, Sender } from '../types';
import { handleBotResponse } from '../helpers';

export const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  useEffect(() => {
    const subscription = getMessages().subscribe(newMessages => {
      setMessages(newMessages);
      setMessagesLoaded(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (messagesLoaded && messages.length === 0) {
      const greetingBotReply = handleBotResponse('/hello');

      handleSendMessage(greetingBotReply as string, Sender.Chatbot);
    }
  }, [messages, messagesLoaded]);

  const handleSendMessage = (text: string, sender: Sender) => {
    if (text.trim()) {
      addNewMessage(text, sender);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setMessages(prevMessages => prevMessages.map(msg => ({ ...msg, unread: false })));
  };

  const handleClearChatHistory = () => {
    clearChat();
    setMessages([]);
  };
  return (
    <div className="h-screen flex justify-center gap-4 items-center">
      <div className="w-[80vw] md:w-[50vw] h-[90vh] shadow-md rounded-2xl border-8 border-black overflow-hidden flex flex-col">
        <Header />
        <MessagesStream messages={messages} />
        <MessageControlPanel
          onSendMessage={handleSendMessage}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearChatHistory={handleClearChatHistory}
        />
      </div>
    </div>
  );
};
