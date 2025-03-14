import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { ChatButton } from 'rxjs-chat-ui-lib';

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
      <div className="w-full lg:w-[70%] flex items-center gap-4">
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && newMessage.trim()) {
              handleSendMessage();
            }
          }}
          placeholder="Type a message"
          className="h-[48px] border border-blue-700 px-2.5 py-3 rounded-xl outline-none w-full bg-gray-600 hover:border-blue-500 focus-visible:border-blue-500"
        />
        <ChatButton
          label=""
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          variant="primary"
          icon={<IoSend className="w-6 h-6 fill-white" />}
        />
      </div>
      <div className="flex items-center gap-4">
        <ChatButton
          label="Read All"
          onClick={onMarkAllAsRead}
          variant="secondary"
          className="min-w-[120px]"
        />
        <ChatButton
          label="Clear History"
          onClick={onClearChatHistory}
          variant="danger"
          className="min-w-[120px]"
        />
      </div>
    </div>
  );
};
