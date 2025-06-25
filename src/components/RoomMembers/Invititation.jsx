import React from 'react';
import { useRecoilState } from 'recoil';
import { roomAtom } from '../../recoils/roomAtom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Invitation = ({ inviter, roomId, roomName, close, group_id,closeHandler }) => {
  if (!close) return null;
  const [room,setRoom] = useRecoilState(roomAtom);
  const navigate = useNavigate();
  const onJoin = async() => {
    const newRoom ={
        room_id:roomId,
        roomName:roomName,
        role:'guest',
        group_id
    }
    const response = await axios.post('http://localhost:5000/api/conference/accept-invitation',{
      group_id
    },{
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response);
    setRoom(newRoom);

    navigate('/studyroom')
    closeHandler(false);
  };

  const onReject = () => {
    closeHandler(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-gray-900 text-white w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">

        {/* Close Button */}
        <button
          onClick={closeHandler}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl z-10"
        >
          ✕
        </button>

        {/* Modal Content with spacing */}
        <div className="p-6 pt-12"> {/* ⬅️ pt-12 pushes content safely below the close button */}
          <p className="text-lg mb-6 text-center px-4">
            <span className="font-semibold text-blue-400">{inviter}</span> has invited you to a meeting named <span className="text-blue-300 font-medium">"{roomName}"</span>.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onJoin}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
            >
              Join
            </button>
            <button
              onClick={onReject}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
