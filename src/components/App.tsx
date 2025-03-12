import { Header } from '../components';

export const App = () => {
  return (
    <div className="h-screen flex justify-center gap-4 items-center bg-gray-50">
      <div className="w-[80vw] md:w-[50vw] h-[90vh] shadow-md rounded-2xl border-8 border-black overflow-hidden flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto bg-gray-600">messages</div>
        <div className="h-[100px] bg-gray-800">
          <button className="bg-blue-500 text-white hover:bg-blue-600">Send Message</button>
          <button className="bg-red-500 text-white hover:bg-red-600">Clear History</button>
          <button className="bg-green-500 text-white hover:bg-green-600">Mark All as Read</button>
        </div>
      </div>
    </div>
  );
};
