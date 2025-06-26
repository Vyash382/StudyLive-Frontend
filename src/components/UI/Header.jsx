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
import { Link, useNavigate } from 'react-router-dom';
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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="w-full shadow-md bg-gray-900 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">StudyLive</div>

        <div className="hidden md:flex items-center space-x-6 text-gray-300">
          {user ? (
            <>
              <Link to="/" className="hover:text-blue-400">
                <Home size={22} />
              </Link>

              <button
                className="hover:text-blue-400"
                onClick={() => setToShowSearch(true)}
              >
                <Search size={22} />
              </button>

              <div className="relative">
                <button
                  className="hover:text-blue-400"
                  onClick={() => setToShowNotifications(true)}
                >
                  <Bell size={22} />
                </button>
              </div>

              <Link to="/chat" className="hover:text-blue-400">
                <MessageCircle size={22} />
              </Link>

              <button
                className="hover:text-blue-400"
                onClick={() => closeHandlerConference(true)}
              >
                <Video size={22} />
              </button>

              <Link to="/previous" className="hover:text-blue-400">
                <Clock size={22} />
              </Link>

              <button
                onClick={handleLogout}
                className="hover:text-red-500 flex items-center gap-1"
              >
                <LogOut size={20} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 cursor-pointer hover:text-blue-400 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:text-blue-400 font-medium cursor-pointer"
              >
                Register
              </Link>
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
        <div className="md:hidden bg-gray-800 px-4 pb-4 shadow text-gray-300 pt-3">
          {user ? (
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                <Home size={20} /> Home
              </Link>

              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  setMenuOpen(false);
                  setToShowSearch(true);
                }}
              >
                <Search size={20} /> Search
              </button>

              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  setMenuOpen(false);
                  setToShowNotifications(true);
                }}
              >
                <Bell size={20} /> Notifications
              </button>

              <Link
                to="/chat"
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                <MessageCircle size={20} /> Chat
              </Link>

              <button
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => {
                  setMenuOpen(false);
                  closeHandlerConference(true);
                }}
              >
                <Video size={20} /> Conference
              </button>

              <Link
                to="/previous"
                className="flex items-center gap-2 hover:text-blue-400"
                onClick={() => setMenuOpen(false)}
              >
                <Clock size={20} /> Previous Sessions
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-500"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link
                to="/login"
                className="text-gray-300 hover:text-blue-400 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 text-center rounded hover:bg-blue-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Global Modals */}
      <Modal toShow={toShowSearch} onClose={setToShowSearch} />
      <NotificationBox
        toShow={toShowNotifications}
        setToShow={setToShowNotifications}
      />
      <RoomMembers
        close={closeConference}
        closeHandler={closeHandlerConference}
      />
    </header>
  );
};

export default Header;
