import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../recoils/userAtom';
import axios from 'axios';

const PreviousSessionsPage = () => {
  const user = useRecoilValue(userAtom);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await axios.post(
          'https://studylive-backend.onrender.com/api/conference/get-previous',
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setSessions(response.data);
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
      }
    }

    if (user) fetchSessions();
  }, [user]);

  return (
    <div className="w-screen h-[calc(100vh-4rem)] mt-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-start p-6 overflow-auto">
      <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        YOUR PREVIOUS STUDY SESSIONS
      </h1>

      <div className="w-full max-w-6xl">
        <div className="max-h-[500px] overflow-y-auto rounded-xl shadow-2xl">
          <table className="min-w-full text-sm bg-gray-900">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-800 to-cyan-700 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="py-3 px-5 text-left">#</th>
                <th className="py-3 px-5 text-left">Session Name</th>
                <th className="py-3 px-5 text-left">Members</th>
                <th className="py-3 px-5 text-left">Summary</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-800 border-b border-gray-700 transition duration-200"
                >
                  <td className="py-3 px-5">{index + 1}</td>
                  <td className="py-3 px-5 font-semibold text-cyan-400">
                    {session.name}
                  </td>
                  <td className="py-3 px-5">{session.members.join(', ')}</td>
                  <td className="py-3 px-5 text-gray-300">{session.summary}</td>
                </tr>
              ))}
              {sessions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No previous study sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PreviousSessionsPage;
