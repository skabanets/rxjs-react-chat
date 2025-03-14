import { useEffect, useState } from 'react';
import { UnreadMessagesLabel } from 'rxjs-chat-ui-lib';

import { Logo } from '../components';

import { getUnreadCount } from '../store';

export const Header = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const subscription = getUnreadCount().subscribe(setUnreadCount);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row px-4 py-2 gap-4 lg:min-h-[54px] bg-gray-800 lg:justify-between items-center">
      <Logo />
      <UnreadMessagesLabel
        unreadCount={unreadCount}
        text="Click any blurred message to mark all as read"
      />
    </div>
  );
};
