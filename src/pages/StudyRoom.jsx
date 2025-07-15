import React, { useState, useEffect, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../recoils/userAtom';
import { useNavigate } from 'react-router-dom';
import { roomAtom } from '../recoils/roomAtom';
import axios from 'axios';
import { useSocket } from '../Socket/SocketContext';
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  selectPeers,
} from '@100mslive/react-sdk';
import {
  Menu,
  Clock3,
  Play,
  RotateCcw,
  LogOut,
  Hammer,
  PenTool,
  Eraser,
  Trash2,
  Video,
  VideoOff,
  Mic,
  MicOff,
  MessageCircle,
  Send,
  Users,
  LoaderCircle,
} from 'lucide-react';

const StudyRoom = () => {
  const [roomVariables, setRoomVariables] = useRecoilState(roomAtom);
  const [mode, setMode] = useState('pad');
  const [showMenu, setShowMenu] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [isEraser, setIsEraser] = useState(false);
  const [dummyMessages, setDummyMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [loading, setLoading] = useState(false);

  const socket = useSocket();
  const canvasRef = useRef();
  const messagesEndRef = useRef(null);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const [token, setToken] = useState('');
  const [pathsBackup, setPathsBackup] = useState([]);

  useEffect(() => {
    document.querySelector('nav')?.classList.add('hidden');
    return () => document.querySelector('nav')?.classList.remove('hidden');
  }, []);

  useEffect(() => {
    if (!user || !roomVariables.room_id) {
      navigate('/');
    } else {
      axios.post('https://studylive-backend.onrender.com/api/conference/get-token', {
        room_id: roomVariables.room_id,
        role: roomVariables.role,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => setToken(res.data.token))
      .catch(() => {});
    }
  }, [user, roomVariables]);

  useEffect(() => {
    if (token && !isConnected) {
      hmsActions.join({
        userName: user?.email || 'Guest',
        authToken: token,
        settings: {
          isAudioMuted: false,
          isVideoMuted: false,
        },
      });
    }
  }, [token, isConnected, hmsActions, user]);

  useEffect(() => {
    if (socket && roomVariables.room_id) {
      socket.emit('join-room', roomVariables.room_id);
      socket.on('receive-drawing', async (data) => {
        setPathsBackup(data);
        await canvasRef.current?.loadPaths(data).catch(() => {});
      });
      socket.on('receive-text', (content) => setTextContent(content));
      socket.on('send-group-messages', ({ sender, data }) => {
        setDummyMessages((prev) => [...prev, { senderId: sender, message: data }]);
      });
      socket.on('receive-clear-canvas', () => {
        setPathsBackup([]);
        canvasRef.current?.clearCanvas?.();
      });
    }
    return () => {
      socket?.off('receive-drawing');
      socket?.off('receive-text');
      socket?.off('send-group-messages');
      socket?.off('receive-clear-canvas');
    };
  }, [socket, roomVariables.room_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dummyMessages]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const startTimer = () => setIsRunning(true);
  const resetTimer = () => {
    setSecondsLeft(25 * 60);
    setIsRunning(false);
  };

  const toggleEraser = async () => {
    setIsEraser(true);
    await canvasRef.current?.eraseMode?.(true);
  };
  const togglePen = async () => {
    setIsEraser(false);
    await canvasRef.current?.eraseMode?.(false);
  };
  const clearCanvas = async () => {
    await canvasRef.current?.clearCanvas?.();
    setPathsBackup([]);
    socket.emit('receive-clear-canvas', { roomId: roomVariables.room_id });
  };
  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isVideoOn);
    setIsVideoOn((prev) => !prev);
  };
  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isAudioOn);
    setIsAudioOn((prev) => !prev);
  };

  const onExit = async () => {
    setLoading(true);
    try {
      if (peers.length === 1) {
        await axios.post('https://studylive-backend.onrender.com/api/gemini/summary', {
          group_id: roomVariables.group_id,
          content: textContent,
        });
      }
      await hmsActions.leave();
      setRoomVariables({ room_id: '', role: '' });
      navigate('/');
    } catch (err) {} finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    socket.emit('send-group-messages', {
      roomId: roomVariables.room_id,
      sender: user.email,
      data: inputMessage,
    });
    setDummyMessages([...dummyMessages, { senderId: 'me', message: inputMessage }]);
    setInputMessage('');
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setTextContent(newText);
    socket.emit('send-text', { roomId: roomVariables.room_id, content: newText });
  };

  const handleStroke = async () => {
    const paths = await canvasRef.current?.exportPaths?.();
    setPathsBackup(paths);
    socket.emit('send-drawing', { roomId: roomVariables.room_id, data: paths });
  };

  useEffect(() => {
    if (mode === 'pad' && pathsBackup.length > 0 && canvasRef.current?.loadPaths) {
      canvasRef.current.loadPaths(pathsBackup);
    }
  }, [mode]);

  return (
    <div className="w-screen min-h-screen mt-0 bg-gray-950 text-white flex flex-col md:flex-row overflow-hidden">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 text-white text-xl gap-2">
          <LoaderCircle className="animate-spin" size={24} /> Saving summary...
        </div>
      )}

      <div className="w-full md:w-1/2 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold flex items-center gap-2">
            <Clock3 size={20} /> {formatTime(secondsLeft)}
          </div>
          <div className="flex gap-2">
            <button onClick={startTimer} className="bg-green-600 px-3 py-1 rounded flex items-center gap-1">
              <Play size={16} /> Start
            </button>
            <button onClick={resetTimer} className="bg-red-600 px-3 py-1 rounded flex items-center gap-1">
              <RotateCcw size={16} /> Reset
            </button>
          </div>
          <button onClick={onExit} className="text-red-400 hover:underline flex items-center gap-1">
            <LogOut size={16} /> End
          </button>
        </div>

        <div className="md:hidden flex justify-between items-center">
          <span className="text-lg flex items-center gap-1"><Hammer size={18} /> Tools</span>
          <button onClick={() => setShowMenu(!showMenu)} className="bg-gray-800 p-2 rounded">
            <Menu />
          </button>
        </div>

        {(showMenu || window.innerWidth >= 768) && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <button className={`px-4 py-2 rounded flex items-center gap-1 ${mode === 'pad' ? 'bg-blue-600' : 'bg-gray-800'}`} onClick={() => setMode('pad')}>
                <PenTool size={16} /> Pad
              </button>
              <button className={`px-4 py-2 rounded flex items-center gap-1 ${mode === 'write' ? 'bg-blue-600' : 'bg-gray-800'}`} onClick={() => setMode('write')}>
                <MessageCircle size={16} /> Write
              </button>
            </div>

            {mode === 'pad' && (
              <div className="flex gap-2">
                <button onClick={togglePen} className="bg-green-600 px-3 py-1 rounded flex items-center gap-1">
                  <PenTool size={16} /> Pen
                </button>
                <button onClick={toggleEraser} className="bg-yellow-600 px-3 py-1 rounded flex items-center gap-1">
                  <Eraser size={16} /> Erase
                </button>
                <button onClick={clearCanvas} className="bg-red-600 px-3 py-1 rounded flex items-center gap-1">
                  <Trash2 size={16} /> Clear
                </button>
              </div>
            )}

            <button onClick={toggleVideo} className="bg-purple-600 px-4 py-2 rounded flex items-center gap-1">
              {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />} {isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
            </button>
            <button onClick={toggleAudio} className="bg-pink-600 px-4 py-2 rounded flex items-center gap-1">
              {isAudioOn ? <Mic size={16} /> : <MicOff size={16} />} {isAudioOn ? 'Mute Audio' : 'Unmute Audio'}
            </button>
          </div>
        )}

        {mode === 'pad' && (
          <div className="h-[400px] bg-gray-800 rounded-lg overflow-hidden">
            <ReactSketchCanvas
              ref={canvasRef}
              onStroke={handleStroke}
              strokeWidth={4}
              strokeColor="white"
              canvasColor="#1f2937"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}

        {mode === 'write' && (
          <textarea
            value={textContent}
            onChange={handleTextChange}
            className="w-full h-[500px] md:h-[600px] bg-gray-900 text-white p-4 resize-none outline-none rounded"
            placeholder="Start writing..."
          />
        )}
      </div>

      <div className="w-full md:w-1/2 p-4 flex flex-col gap-4">
        <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded">
          <div className="text-lg font-semibold mb-2 flex items-center gap-2">
            <MessageCircle size={18} /> Chat
          </div>
          {dummyMessages.map((msg, idx) => (
            <div key={idx} className={`p-2 rounded ${msg.senderId === 'me' ? 'bg-blue-600 self-end ml-auto text-white' : 'bg-gray-700'}`}>
              <div className="text-xs text-gray-300">{msg.senderId}</div>
              <div>{msg.message}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white p-2 rounded"
          />
          <button onClick={handleSendMessage} className="bg-blue-500 px-4 py-2 rounded flex items-center gap-1">
            <Send size={16} /> Send
          </button>
        </div>

        <div className="mt-4">
          <div className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Users size={18} /> Participants
          </div>
          <div className="grid grid-cols-2 gap-2">
            {peers.map((peer) => (
              <div key={peer.id} className="bg-black p-2 rounded text-center">
                <video
                  ref={(el) => el && peer.videoTrack && hmsActions.attachVideo(peer.videoTrack, el)}
                  autoPlay
                  muted={peer.isLocal}
                  playsInline
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-white text-sm mt-1">{peer.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;
