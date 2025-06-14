import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Modal = ({ toShow, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setUsers([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  async function fetchUsers(query) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("User not authenticated");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        'http://localhost:5000/api/user/searchUsers',
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.type) {
        setUsers(response.data.results);
      } else {
        alert(response.data.message || "Failed to fetch users");
      }

    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  }

  const handleToggleFriend = async(id) => {
    let selected_user={};
    users.map((user)=>{
      if(user.id==id){
        selected_user=user;
      }
    })
    if(selected_user.status=="Add"){
      const response = await axios.post('http://localhost:5000/api/friend/sendRequest',{
        receiver : id
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      alert(response.data.message);
      fetchUsers(searchTerm);
    }
    
    else if(selected_user.status=="Unfriend"){
      const response = await axios.post('http://localhost:5000/api/friend/unfriend',{
        receiver : id
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      alert(response.data.message);
      fetchUsers(searchTerm);
    }
  };
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!toShow) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-[#1e1e2f] text-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <button
          onClick={() => { onClose(false); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Search Users</h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full px-4 py-2 bg-[#2a2a3b] text-white border border-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : filteredUsers.length === 0 ? (
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
                <div>
                  <span className="text-lg font-medium">{user.name}</span>
                  <div className="text-sm text-gray-400">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => handleToggleFriend(user.id)}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                  user.status === "Action Pending"
                    ? 'bg-red-800 text-red-200 hover:bg-red-700 cursor-not-allowed pointer-events-none'
                    : 'bg-blue-800 text-blue-200 hover:bg-blue-700'
                }`}
              >
                {user.status}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Modal;
