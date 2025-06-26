import React, { useState } from 'react';
import {
  Bell,
  MessageCircle,
  Search,
  Video,
  Menu,
  X,
  LogOut,
  Home,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import NotificationBox from '../Notifications/NotificationBox';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoils/userAtom';
import RoomMembers from '../RoomMembers/RoomMembers';

const Header = () => {
  const [toShowSearch, setToShowSearch] = useState(false);
  const [toShowNotifications, setToShowNotifications] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [closeConference, closeHandlerConference] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/login');
  }

  function handleRegister() {
    navigate('/register');
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setMenuOpen(false);
  };

  return (
    <header className="w-full shadow-md bg-gray-900 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">StudyLive</div>

        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          {user ? (
            <>
              <button
                className="hover:text-blue-400"
                onClick={() => navigate('/')}
              >
                <Home size={22} />
              </button>

              <button
                className="hover:text-blue-400"
                onClick={() => setToShowSearch((prev) => !prev)}
              >
                <Search size={22} />
              </button>
              <Modal toShow={toShowSearch} onClose={setToShowSearch} />

              <div className="relative">
                <button
                  className="hover:text-blue-400"
                  onClick={() => setToShowNotifications(true)}
                >
                  <Bell size={22} />
                </button>
                <NotificationBox
                  toShow={toShowNotifications}
                  setToShow={setToShowNotifications}
                />
              </div>

              <button
                className="hover:text-blue-400"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle size={22} />
              </button>

              <button
                className="hover:text-blue-400"
                onClick={() => closeHandlerConference(!closeConference)}
              >
                <Video size={22} />
              </button>
              <RoomMembers
                close={closeConference}
                closeHandler={closeHandlerConference}
              />

              <button
                className="hover:text-blue-400"
                onClick={() => navigate('/previous')}
              >
                <Clock size={22} />
              </button>

              <button
                onClick={handleLogout}
                className="hover:text-red-500 flex items-center gap-1"
              >
                <LogOut size={20} /> Logout
              </button>
            </>
          ) : (
            <>
              <p
                onClick={handleLogin}
                className="text-gray-300 cursor-pointer hover:text-blue-400 font-medium"
              >
                Login
              </p>
              <p
                onClick={handleRegister}
                className="text-gray-300 hover:text-blue-400 font-medium cursor-pointer"
              >
                Register
              </p>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 shadow text-gray-300">
          {user ? (
            <div className="flex flex-col space-y-3">
              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  setToShowSearch(true);
                  setMenuOpen(false);
                }}
              >
                <Search size={20} /> Search
              </button>

              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  setToShowNotifications(true);
                  setMenuOpen(false);
                }}
              >
                <Bell size={20} /> Notifications
              </button>

              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  navigate('/chat');
                  setMenuOpen(false);
                }}
              >
                <MessageCircle size={20} /> Chat
              </button>

              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  closeHandlerConference(true);
                  setMenuOpen(false);
                }}
              >
                <Video size={20} /> Conference
              </button>

              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  navigate('/previous');
                  setMenuOpen(false);
                }}
              >
                <Clock size={20} /> Previous Sessions
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-500"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <a
                href="/login"
                className="text-gray-300 hover:text-blue-400 font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 text-center rounded hover:bg-blue-700 transition"
              >
                Register
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
