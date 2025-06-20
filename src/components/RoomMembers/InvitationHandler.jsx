import React, { useEffect, useState } from 'react'
import { useSocket } from '../../Socket/SocketContext'
import Invitation from './Invititation';

const InvitationHandler = () => {
  const socket = useSocket();
  if(!socket) return null;
  const [close,closeHandler] = useState(false);
  const [invitor,setInvitor] = useState('');
  const [roomId,setRoomId] = useState('');
  const [roomName,setRoomName] = useState(''); 
  
  useEffect(()=>{
    function handleInvitation(data){
        const {inviter,roomId,roomName} = data;
        setInvitor(inviter);
        setRoomId(roomId);
        setRoomName(roomName);
        closeHandler(true);
        console.log('aaya');
    }
    socket.on("invitation",handleInvitation);
  },[])
  
  return (
    <Invitation inviter={invitor} roomId={roomId} roomName={roomName} close={close} closeHandler={closeHandler} />
  )
}

export default InvitationHandler
