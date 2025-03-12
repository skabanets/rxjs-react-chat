import { formatTimestamp } from '../helpers';

import { Sender, type Message } from '../types';

interface MessageProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageProps) => {
  const { sender, text, unread, date } = message;

  const timestamp = formatTimestamp(date);

  return (
    <li
      className={`relative p-3 max-w-[70%] rounded-2xl z-20 text-white ${
        sender === Sender.User
          ? `ml-auto bg-[#289df6] after:right-[-10px]`
          : `mr-auto bg-[#1159ac] after:left-[-10px]`
      } after:content-[''] after:absolute after:w-0 after:h-0 after:border-transparent after:border-t-[26px] after:z-[-1] ${
        sender === Sender.User
          ? `after:border-l-[26px] after:border-l-[#289df6] after:bottom-0`
          : `after:border-r-[26px] after:border-r-[#1159ac] after:bottom-0`
      }  ${unread ? 'blur-sm cursor-pointer' : 'blur-none cursor-default'}`}
    >
      <p>{text}</p>
      <p
        className={`text-xs text-gray-300 mt-1 ${
          sender === Sender.User ? 'text-left' : 'text-right'
        }`}
      >
        {timestamp}
      </p>
    </li>
  );
};
