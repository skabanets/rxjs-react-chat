import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

import { getRandomDelay, handleBotResponse } from '../helpers';
import { Sender } from '../types';

interface MessageControlPanelProps {
  onSendMessage: (text: string, sender: Sender) => void;
  onMarkAllAsRead: () => void;
  onClearChatHistory: () => void;
}

export const MessageControlPanel = ({
  onSendMessage,
  onMarkAllAsRead,
  onClearChatHistory,
}: MessageControlPanelProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage, Sender.User);

      const botReply = handleBotResponse(newMessage.trim());

      if (Array.isArray(botReply)) {
        botReply.forEach((response, index) => {
          setTimeout(() => {
            onSendMessage(response, Sender.Chatbot);
          }, getRandomDelay() * index);
        });
      } else {
        setTimeout(() => {
          onSendMessage(botReply, Sender.Chatbot);
        }, getRandomDelay());
      }

      setNewMessage('');
    }
  };

  return (
    <div className="lg:h-[100px] px-4 py-5 bg-gray-800 flex justify-between flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-[62%] flex items-center gap-2">
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && newMessage.trim()) {
              handleSendMessage();
            }
          }}
          placeholder="Type a message"
          className="border border-blue-700 px-2.5 py-3 rounded-xl outline-none w-full bg-gray-600 hover:border-blue-500 focus-visible:border-blue-500"
        />
        <button
          className={`bg-blue-500 flex items-center justify-center hover:bg-blue-600 ${
            !newMessage.trim() ? 'opacity-50 !cursor-not-allowed' : ''
          }`}
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <IoSend className="w-6 h-6 fill-white" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 w-1/2 lg:w-fit"
          onClick={onMarkAllAsRead}
        >
          Mark All as Read
        </button>
        <button
          className="bg-red-500  hover:bg-red-600 w-1/2 lg:w-fit"
          onClick={onClearChatHistory}
        >
          Clear History
        </button>
      </div>
    </div>
  );
};
