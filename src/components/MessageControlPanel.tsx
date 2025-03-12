import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

interface MessageControlPanelProps {
  onSendMessage: (text: string) => void;
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
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="h-[100px] px-4 py-5 bg-gray-800 flex justify-between">
      <div className="w-[62%] flex items-center gap-2">
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
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
        <button className="bg-green-500 hover:bg-green-600" onClick={onMarkAllAsRead}>
          Mark All as Read
        </button>
        <button className="bg-red-500  hover:bg-red-600" onClick={onClearChatHistory}>
          Clear History
        </button>
      </div>
    </div>
  );
};
