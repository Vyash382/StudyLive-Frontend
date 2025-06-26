import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const NotificationBox = ({ toShow, setToShow }) => {
  const [notifications, setNotifications] = useState([]);

  async function fetch_notifications() {
    try {
      const response = await axios.post(
        'https://studylive-backend.onrender.com/api/notifications/getNotifications',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotifications(response.data.results);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }

  useEffect(() => {
    fetch_notifications();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post(
        'https://studylive-backend.onrender.com/api/notifications/acceptRequest',
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, type: 'friend' } : notif
        )
      );
    } catch (err) {
      console.error('Error accepting request:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        'https://studylive-backend.onrender.com/api/notifications/rejectRequest',
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (err) {
      console.error('Error rejecting request:', err);
    }
  };

  if (!toShow) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-xl shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        <button
          onClick={() => {
            setToShow(false);
          }}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">No notifications</p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-center justify-between bg-gray-700 rounded-lg p-3 mb-2"
          >
            <div className="flex items-center gap-3">
              <img src={notif.photo} className="w-10 h-10 rounded-full" />
              <div className="text-white text-sm">
                {notif.type === 1 ? (
                  <p>
                    <span className="font-medium">{notif.name}</span> accepted
                    your friend request.
                  </p>
                ) : notif.type === 2 ? (
                  <p>
                    <span className="font-medium">{notif.name}</span> sent you a
                    friend request.
                  </p>
                ) : (
                  <p>
                    You and <span className="font-medium">{notif.name}</span>{' '}
                    are now friends.
                  </p>
                )}
              </div>
            </div>

            {notif.type === 2 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(notif.id)}
                  className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(notif.id)}
                  className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationBox;
