import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Paperclip, MessageCircle, Send } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../recoils/userAtom';
import axios from 'axios';
import { useSocket } from '../Socket/SocketContext';
import { getCachedMessages, cacheMessages } from './CacheChats';

const ChatPage = () => {
  const user = useRecoilValue(userAtom);
  const myUserId = user?.id;
  const [friends, setFriends] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  async function get_messages(id) {
    const cached = getCachedMessages(id);
    if (cached) {
      setMessages((prev) => ({ ...prev, [id]: cached }));
      return;
    }

    try {
      const response = await axios.post(
        'https://studylive-backend.onrender.com/api/chat/getChat',
        { other_id: id },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessages((prev) => ({
        ...prev,
        [id]: response.data.messages,
      }));
      cacheMessages(id, response.data.messages);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  }

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      const id = data.sender_id === myUserId ? data.receiver_id : data.sender_id;

      if (data.sender_id !== myUserId && audioRef.current) {
        audioRef.current.play().catch((err) => console.log('Audio error:', err));
      }

      setMessages((prev) => {
        const updated = [...(prev[id] || []), data];
        cacheMessages(id, updated);
        return { ...prev, [id]: updated };
      });
    };

    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage', handleNewMessage);
  }, [socket, myUserId]);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    if (chatId) get_messages(chatId);
  }, [chatId]);

  useEffect(() => {
    async function get_friends() {
      try {
        const response = await axios.post(
          'https://studylive-backend.onrender.com/api/chat/getFriends',
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setFriends(response.data.friends);
      } catch (err) {
        console.error('Failed to fetch friends:', err);
      }
    }
    get_friends();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatId]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSend = async () => {
    if (!chatId) return;
    const token = localStorage.getItem('token');

    try {
      let response;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('other_id', chatId);
        response = await axios.post(
          'https://studylive-backend.onrender.com/api/chat/sendMessage',
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else if (input.trim() !== '') {
        response = await axios.post(
          'https://studylive-backend.onrender.com/api/chat/sendMessage',
          {
            other_id: chatId,
            content: input,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
      }

      if (response?.data?.type) {
        const msg = response.data.data;
        setMessages((prev) => {
          const updated = [...(prev[chatId] || []), {
            sender_id: msg.sender_id,
            type: msg.type,
            content: msg.content,
          }];
          cacheMessages(chatId, updated);
          return { ...prev, [chatId]: updated };
        });
      }

      setInput('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const selectedFriend = friends.find((u) => u.id === Number(chatId));

  return (
    <div className="w-screen h-[calc(100vh-64px)] mt-16 bg-gray-950 text-white flex flex-col md:flex-row overflow-hidden relative">
      <audio ref={audioRef} src="/notifications.mp3" preload="auto" />

      <button
        className="absolute top-2 left-2 z-20 md:hidden p-2 bg-gray-800 rounded-full"
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>

      <div className={`fixed top-0 left-0 h-full w-64 z-10 bg-gray-900 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:w-1/3 lg:w-1/4`}>
        <div className="p-4 font-bold text-xl text-blue-400">Chats</div>
        <ul className="overflow-y-auto max-h-[calc(100vh-64px)]">
          {friends.map((user) => (
            <Link to={`/chat/${user.id}`} key={user.id} onClick={closeSidebar}>
              <li className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 border-b border-gray-800">
                <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-400 text-sm truncate w-40">
                    {user.type === 'media' ? '📷 media' : user.lastmessage}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        {!chatId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex items-center justify-center text-gray-400 text-xl gap-2"
          >
            <MessageCircle /> No chat selected
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full flex flex-col"
          >
            <div className="border-b border-gray-700 p-4 flex items-center gap-3 text-blue-300 text-lg font-semibold">
              {selectedFriend?.photo && (
                <img src={selectedFriend.photo} alt={selectedFriend.name} className="w-10 h-10 rounded-full" />
              )}
              <span>{selectedFriend?.name || 'Unknown'}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
              {(messages[chatId] || []).map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl max-w-[80%] text-sm break-words shadow-md ${
                    String(msg.sender_id) === String(myUserId)
                      ? 'bg-blue-600 self-end text-white'
                      : 'bg-gray-800 self-start text-gray-100'
                  }`}
                >
                  {msg.type === 'media' ? (
                    <a href={msg.content} target="_blank" rel="noopener noreferrer">
                      <img src={msg.content} alt="media" className="max-w-xs max-h-64 rounded-lg" />
                    </a>
                  ) : (
                    msg.content
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-700 p-4 flex flex-col gap-2">
              {selectedFile && (
                <div className="text-sm text-gray-300 flex justify-between items-center">
                  📎 {selectedFile.name}
                  <button className="text-red-400 text-xs" onClick={() => setSelectedFile(null)}>Cancel</button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="cursor-pointer p-2 bg-gray-800 rounded hover:bg-gray-700">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedFile(file);
                        setInput('');
                      }
                    }}
                    disabled={selectedFile !== null}
                  />
                  <Paperclip className="text-white" size={18} />
                </label>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={selectedFile ? 'Sending file...' : 'Type a message...'}
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
                  disabled={selectedFile !== null}
                />

                <button
                  onClick={handleSend}
                  className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 flex items-center gap-1"
                >
                  <Send size={16} /> Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
