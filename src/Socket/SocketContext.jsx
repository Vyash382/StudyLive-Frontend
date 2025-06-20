import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ user, children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect(); 
        setSocket(null);
      }
      return;
    }
    const newSocket = io('http://localhost:5000', {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect(); 
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
