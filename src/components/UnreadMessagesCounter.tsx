import { useEffect, useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';

import { getUnreadCount } from '../store';

export const UnreadMessagesCounter = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const subscription = getUnreadCount().subscribe(setUnreadCount);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex gap-2 items-center">
      {unreadCount > 0 && (
        <p className="text-sm text-yellow-300">Click any blurred message to mark all as read</p>
      )}
      <div className="relative">
        <IoIosNotifications className="size-8" />
        {unreadCount > 0 && (
          <span className="absolute rounded-full bg-red-500 size-6 flex justify-center items-center right-[-6px] top-[-6px]">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};
