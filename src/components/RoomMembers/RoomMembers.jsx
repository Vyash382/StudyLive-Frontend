import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userAtom } from '../../recoils/userAtom';
import { useNavigate } from 'react-router-dom';
import { roomAtom } from '../../recoils/roomAtom';

const RoomMembers = ({ close, closeHandler }) => {
  const navigate = useNavigate()
  const [friends, setFriends] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [room,setRoom] = useRecoilState(roomAtom);
  useEffect(() => {
    async function get_friends() {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/chat/getFriends',
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setFriends(response.data.friends);
      } catch (err) {
        console.error('Failed to fetch friends', err);
      }
    }
    get_friends();
  }, []);

  const toggleMember = (friendId) => {
    setSelectedMembers((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleSubmit = async() => {
    const response = await axios.post('http://localhost:5000/api/conference/create-room',{
        roomName
    })
    const roomId = response.data.id;
    const response2 = await axios.post('http://localhost:5000/api/conference/send-invitation',{
        invitees:selectedMembers,
        roomName,
        roomId
    },{
        headers:{
            authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
    const newRoom ={
        room_id:roomId,
        roomName:roomName,
        role:'host'
    }
    setRoom(newRoom);

    navigate('/studyroom')
    closeHandler(false);
  };

  if (!close) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={()=>{closeHandler(!close)}}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Create a Study Room</h2>

        {/* Friends list */}
        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
          {friends.map((friend) => (
            <label
              key={friend.id}
              className="flex items-center gap-3 p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedMembers.includes(friend.id)}
                onChange={() => toggleMember(friend.id)}
                className="accent-blue-500"
              />
              <img
                src={friend.photo || 'https://ui-avatars.com/api/?name=' + friend.name}
                alt={friend.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{friend.name}</span>
            </label>
          ))}
        </div>

        {/* Room name input */}
        <input
          type="text"
          placeholder="Enter the room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default RoomMembers;
