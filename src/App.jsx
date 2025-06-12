import { useState } from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./components/UI/Header";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import StudyRoom from "./pages/StudyRoom";

function App() {
  const [user,setUser] = useState('1');
  return (
    <>
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path='studyroom' element={<StudyRoom/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
