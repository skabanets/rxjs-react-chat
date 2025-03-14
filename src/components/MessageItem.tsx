import { ChatMessage } from 'rxjs-chat-ui-lib';

import { formatTimestamp } from '../helpers';
import { markAllAsRead } from '../store';

import type { Message } from '../types';

interface MessageProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageProps) => {
  const { sender, text, unread, date } = message;

  const timestamp = formatTimestamp(date);

  const handleMessageClick = (unread: boolean) => {
    if (unread) {
      markAllAsRead();
    }
  };

  return (
    <ChatMessage
      sender={sender}
      text={text}
      unread={unread}
      timestamp={timestamp}
      onMessageClick={handleMessageClick}
    />
  );
};
