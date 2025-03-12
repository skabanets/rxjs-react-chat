import { IoIosNotifications } from 'react-icons/io';

export const UnreadMessagesCounter = () => {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm text-yellow-300">Click any blurred message to mark all as read</p>
      <IoIosNotifications className="size-8" />
    </div>
  );
};
