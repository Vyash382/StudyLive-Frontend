import React, { useState, useRef, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const dummyMessagesInitial = [
  { senderId: 'me', message: 'Hey team!' },
  { senderId: '1', message: 'Hi, ready to begin?' },
  { senderId: 'me', message: 'Yes! Let’s do this.' },
];

const StudyRoom = () => {
  const [mode, setMode] = useState('pad');
  const [textContent, setTextContent] = useState('');
  const [isEraser, setIsEraser] = useState(false);
  const [dummyMessages, setDummyMessages] = useState(dummyMessagesInitial);
  const [inputMessage, setInputMessage] = useState('');
  const canvasRef = useRef();
  const messagesEndRef = useRef(null);

  // Pomodoro Timer
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dummyMessages]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startTimer = () => setIsRunning(true);
  const resetTimer = () => {
    setSecondsLeft(25 * 60);
    setIsRunning(false);
  };

  const clearCanvas = async () => {
    try {
      await canvasRef.current.clearCanvas();
    } catch (err) {
      console.error('Failed to clear canvas:', err);
    }
  };

  const toggleEraser = async () => {
    try {
      setIsEraser(true);
      await canvasRef.current.eraseMode(true);
    } catch (err) {
      console.error('Failed to toggle eraser:', err);
    }
  };

  const togglePen = async () => {
    try {
      setIsEraser(false);
      await canvasRef.current.eraseMode(false);
    } catch (err) {
      console.error('Failed to toggle pen:', err);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setDummyMessages([...dummyMessages, { senderId: 'me', message: inputMessage }]);
      setInputMessage('');
    }
  };

  return (
    <div className="w-screen h-[calc(100vh-64px)] mt-16 bg-gray-950 text-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Side */}
      <div className="w-full md:w-1/2 border-r border-gray-700 flex flex-col p-4 space-y-4 overflow-y-auto">
        {/* Top Buttons */}
        <div className="flex gap-4 mb-2">
          <button
            className={`px-4 py-2 rounded-md ${mode === 'pad' ? 'bg-blue-500' : 'bg-gray-800'}`}
            onClick={() => setMode('pad')}
          >
            Pad
          </button>
          <button
            className={`px-4 py-2 rounded-md ${mode === 'write' ? 'bg-blue-500' : 'bg-gray-800'}`}
            onClick={() => setMode('write')}
          >
            Write
          </button>
        </div>

        {/* Pomodoro Timer */}
        <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
          <div className="text-2xl font-mono">{formatTime(secondsLeft)}</div>
          <div className="flex gap-2">
            <button onClick={startTimer} className="bg-green-600 px-3 py-1 rounded">
              Start
            </button>
            <button onClick={resetTimer} className="bg-red-600 px-3 py-1 rounded">
              Reset
            </button>
          </div>
        </div>

        {/* Pad Controls */}
        {mode === 'pad' && (
          <div className="flex gap-2">
            <button onClick={togglePen} className="px-3 py-1 bg-green-600 rounded">
              Pen
            </button>
            <button onClick={toggleEraser} className="px-3 py-1 bg-yellow-600 rounded">
              Erase
            </button>
            <button onClick={clearCanvas} className="px-3 py-1 bg-red-600 rounded">
              Clear
            </button>
          </div>
        )}

        {/* Drawing or Writing Area */}
        <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
          {mode === 'pad' ? (
            <ReactSketchCanvas
              ref={canvasRef}
              style={{ height: '100%', width: '100%' }}
              strokeWidth={4}
              strokeColor="white"
              canvasColor="#1f2937"
            />
          ) : (
            <textarea
              placeholder="Start typing..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="w-full h-full bg-gray-900 text-white p-4 rounded-lg resize-none outline-none"
            />
          )}
        </div>
      </div>

      {/* Right Side - Chat & Videos */}
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Chat Box */}
        <div className="flex-1 border-b border-gray-700 p-4 flex flex-col overflow-y-auto">
          <div className="font-semibold text-lg mb-2">Chat</div>
          <div className="bg-gray-800 p-4 rounded-lg flex-1 text-gray-200 space-y-2 overflow-y-auto">
            {dummyMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded-xl max-w-[80%] ${
                  msg.senderId === 'me'
                    ? 'bg-blue-500 self-end text-white ml-auto'
                    : 'bg-gray-700 self-start'
                }`}
              >
                <div className="text-xs mb-1 text-gray-300">
                  {msg.senderId === 'me' ? 'You' : `User ${msg.senderId}`}
                </div>
                {msg.message}
              </div>
            ))}
            {/* 👇 Auto scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-gray-700 text-white p-2 rounded-lg outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4 bg-gray-900 overflow-y-auto">
          <div className="font-semibold text-lg mb-2 text-white">Participants</div>
          <div className="grid grid-cols-2 gap-4 h-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;
