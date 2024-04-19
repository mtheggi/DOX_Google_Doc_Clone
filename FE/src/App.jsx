import './index.css'
import LogIn from './views/Login'
import SignUp from './views/Signup'
import Home from './views/Home'
import TextEditor from './views/TextEditor'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quill from './Components/CustomizedQuill'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { DisconnectWebSocket, ConnectToWebSocket, sendmessage } from './services/WebSocket';
function App() {
  const [isNotFound, setIsNotFound] = useState(false);
  return (
    <Router>
      <div className="App h-screen flex flex-col bg-gray-200 overflow-x-hidden">
        {/* <button onClick={() => sendmessage({ operation: "INSERT", documentId: "5", character: "A" })}>  test </button> */}
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/texteditor" element={
            <TextEditor />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
