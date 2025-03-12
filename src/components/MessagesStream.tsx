import { useEffect, useRef, useState } from 'react';

import { MessageItem } from '../components';

import { getMessages } from '../store';
import { type Message } from '../types';

export const MessagesStream = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: isInitialRender ? 'instant' : 'smooth' });

      if (isInitialRender) {
        setIsInitialRender(false);
      }
    }
  }, [messages, isInitialRender]);

  useEffect(() => {
    const subscription = getMessages().subscribe(setMessages);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="flex-1 p-4 bg-gray-700 overflow-y-auto">
      <ul className="flex flex-col gap-6">
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};
