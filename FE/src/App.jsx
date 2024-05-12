import './index.css'
import LogIn from './views/Login'
import SignUp from './views/Signup'
import Home from './views/Home'
import TextEditor from './views/TextEditor'
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quill from './Components/CustomizedQuill'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { DisconnectWebSocket, ConnectToWebSocket, sendmessage } from './services/WebSocket';
import NotFound from './views/NotFound'
import {baseUrl} from "./Constants"
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')) || false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const socket = new SockJS({baseUrl}/ws);
  //   const client = Stomp.over(socket);
  //   console.log("HHHHHHHHHHHHHHHHHHHHHHHEREE");
  //   client.connect({}, () => {
  //     console.log('connection established');
  //     client.subscribe('/app/topic', (message) => {
  //       const recievedMessage = JSON.parse(message.body);
  //       console.log("messsage recieved", recievedMessage);
  //     });

  //     // Move the send method inside the connect callback
  //     client.send('/app/broadcast', {}, JSON.stringify({ message: 'Hello' }));
  //   });

  //   return () => {
  //     client.disconnect();
  //   }
  // }, []);

  return (
    <Router>
      <div className="App h-screen flex flex-col bg-gray-200 overflow-hidden">
        {/* <button onClick={() => sendmessage({ operation: "INSERT", documentId: "5", character: "A" })}>  test </button> */}
        <Routes>

          <Route path="/" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn}  />} />

          {isLoggedIn && <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn}  />} />}
          {isLoggedIn && <Route path="/texteditor" element={<TextEditor />} />}
          {isLoggedIn && <Route path="/texteditor/:id" element={<TextEditor />} />}

          <Route path="/*" element={<NotFound />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App;
