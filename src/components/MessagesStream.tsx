import { useEffect, useRef, useState } from 'react';

import { MessageItem } from '../components';

import { type Message } from '../types';

interface MessagesStreamProps {
  messages: Message[];
}

export const MessagesStream = ({ messages }: MessagesStreamProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (messages.length > 0 && !isInitialized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
      setIsInitialized(true);
    }
  }, [messages, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 p-4 bg-gray-700 overflow-y-auto overflow-x-hidden">
      <ul className="flex flex-col gap-6">
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};
