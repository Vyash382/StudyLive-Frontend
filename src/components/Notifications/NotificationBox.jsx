import React, { useState } from 'react';
import { X } from 'lucide-react';

const dummyNotifications = [
  {
    id: 1,
    type: 'accepted',
    from: 'Alice Johnson',
    photo: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    type: 'received',
    from: 'Bob Smith',
    photo: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    type: 'received',
    from: 'Charlie Davis',
    photo: 'https://i.pravatar.cc/150?img=3',
  },
];

const NotificationBox = ({ toShow,setToShow }) => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleAccept = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, type: 'accepted' } : notif
      )
    );
  };

  const handleReject = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };
  if(!toShow) return null;
  return (
    <div className="absolute right-0 mt-2 w-96 bg-gray-800 rounded-xl shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        <button
          onClick={()=>{setToShow(false)}}
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
              <img
                src={notif.photo}
                alt={notif.from}
                className="w-10 h-10 rounded-full"
              />
              <div className="text-white text-sm">
                {notif.type === 'accepted' ? (
                  <p>
                    <span className="font-medium">{notif.from}</span> accepted
                    your friend request.
                  </p>
                ) : (
                  <p>
                    <span className="font-medium">{notif.from}</span> sent you a
                    friend request.
                  </p>
                )}
              </div>
            </div>

            {notif.type === 'received' && (
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
