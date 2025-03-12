import { Logo, UnreadMessagesCounter } from '../components';

export const Header = () => {
  return (
    <div className="px-2.5 py-2 h-[54px] bg-gray-800 flex justify-between items-center">
      <Logo />
      <UnreadMessagesCounter />
    </div>
  );
};
