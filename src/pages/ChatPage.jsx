import React, { useState,useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react'; // or use any icon library
import { useRecoilValue } from 'recoil';
import { userAtom } from '../recoils/userAtom';

const myUserId = 'me';

const dummyUsers = [
  { id: '1', name: 'Alice', photo: 'https://i.pravatar.cc/150?img=1', lastMessage: 'See you soon!' },
  { id: '2', name: 'Bob', photo: 'https://i.pravatar.cc/150?img=2', lastMessage: 'What’s the plan?' },
  { id: '3', name: 'Charlie', photo: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Let’s start studying!' },
];

const dummyMessages = {
  '1': [
    { senderId: 'me', message: 'Hi Alice!' },
    { senderId: '1', message: 'Hey there!' },
    { senderId: 'me', message: 'How are you?' },
  ],
  '2': [
    { senderId: '2', message: 'What’s the plan?' },
    { senderId: 'me', message: 'Meeting at 5?' },
  ],
  '3': [
    { senderId: '3', message: 'Charlie here!' },
    { senderId: 'me', message: 'Ready to study?' },
  ],
};

const ChatPage = () => {
  const { chatId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useRecoilValue(userAtom)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <div className="w-screen h-[calc(100vh-64px)] mt-16 bg-gray-950 text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* Mobile Toggle Button */}
      <button
        className="absolute top-2 left-2 z-20 md:hidden p-2 bg-gray-800 rounded-full text-white"
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-10 bg-gray-900 border-r border-gray-700 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:w-1/3 lg:w-1/4 md:block
        `}
      >
        <div className="p-4 font-bold text-xl text-blue-400 sticky top-0 bg-gray-900 z-10">Chats</div>
        <ul>
          {dummyUsers.map((user) => (
            <Link to={`/chat/${user.id}`} key={user.id} onClick={closeSidebar}>
              <li className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 cursor-pointer transition-all">
                <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-400 text-sm truncate w-40">{user.lastMessage}</div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {!chatId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex items-center justify-center text-gray-400 text-xl"
          >
            No chat selected. Select a user to start chatting.
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full flex flex-col"
          >
            <div className="border-b border-gray-700 p-4 font-semibold text-xl">
              Chat with {dummyUsers.find((u) => u.id === chatId)?.name || 'Unknown'}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 w-full flex flex-col">
              {(dummyMessages[chatId] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl max-w-[80%] ${
                    msg.senderId === myUserId
                      ? 'bg-blue-500 self-end text-white'
                      : 'bg-gray-800 self-start'
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 p-4 w-full">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
