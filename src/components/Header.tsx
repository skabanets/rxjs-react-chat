import { Logo, UnreadMessagesCounter } from '../components';

export const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row px-4 py-2 gap-4 lg:min-h-[54px] bg-gray-800 lg:justify-between items-center">
      <Logo />
      <UnreadMessagesCounter />
    </div>
  );
};
