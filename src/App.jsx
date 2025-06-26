import { useRecoilState } from 'recoil';
import { userAtom } from './recoils/userAtom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/UI/Header';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';
import StudyRoom from './pages/StudyRoom';
import { useEffect } from 'react';
import axios from 'axios';
import { SocketProvider } from './Socket/SocketContext';
import { roomAtom } from './recoils/roomAtom';
import Invitation from './components/RoomMembers/Invititation';
import InvitationHandler from './components/RoomMembers/InvitationHandler';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import PreviousSessionsPage from './pages/Previos';
function App() {
  const [user, setUser] = useRecoilState(userAtom);
  const [roomVariables,setRoomVariables] = useRecoilState(roomAtom);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.post(
          'http://localhost:5000/api/user/getDetails',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser({
          id: response.data.user.id,
          email: response.data.user.email
        });
      } catch (error) {
        console.error('User fetch failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <HMSRoomProvider>
    <SocketProvider user={user} >
    
    <BrowserRouter>
      <InvitationHandler />
      <Header />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/previous" element={<PreviousSessionsPage />} />
        {roomVariables.room_id?<Route path="/studyroom" element={<StudyRoom />} />:<Route path="/" element={<About />} />}
      </Routes>
    </BrowserRouter>
    </SocketProvider>
    </HMSRoomProvider>
  );
}

export default App;
