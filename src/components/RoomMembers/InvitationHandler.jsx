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
  const [group_id,setGroup_id] = useState('');
  useEffect(()=>{
    function handleInvitation(data){
        const {inviter,roomId,roomName,group_id} = data;
        setInvitor(inviter);
        setRoomId(roomId);
        setRoomName(roomName);
        setGroup_id(group_id);
        closeHandler(true);
    }
    socket.on("invitation",handleInvitation);
  },[])
  
  return (
    <Invitation inviter={invitor} roomId={roomId} roomName={roomName} close={close} group_id={group_id} closeHandler={closeHandler} />
  )
}

export default InvitationHandler
