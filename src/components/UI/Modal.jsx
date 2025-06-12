import React, { useState } from 'react';

const dummyUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    photo: 'https://i.pravatar.cc/150?img=1',
    isFriend: false,
  },
  {
    id: 2,
    name: 'Bob Smith',
    photo: 'https://i.pravatar.cc/150?img=2',
    isFriend: true,
  },
  {
    id: 3,
    name: 'Charlie Davis',
    photo: 'https://i.pravatar.cc/150?img=3',
    isFriend: false,
  },
];

const Modal = ({ toShow, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(dummyUsers);

  const handleToggleFriend = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isFriend: !user.isFriend } : user
    );
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!toShow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-[#1e1e2f] text-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={()=>{onClose(false)}}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Search Users</h2>

        <input
          type="text"
          placeholder="Search by username..."
          className="w-full px-4 py-2 bg-[#2a2a3b] text-white border border-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredUsers.length === 0 ? (
          <p className="text-gray-400 text-center">No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 border-b border-gray-700"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-lg font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => handleToggleFriend(user.id)}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                  user.isFriend
                    ? 'bg-red-800 text-red-200 hover:bg-red-700'
                    : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                }`}
              >
                {user.isFriend ? 'Remove' : 'Add'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Modal;
