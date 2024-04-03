import './index.css'
import FloatingInput from './Components/authentication/FloatingInput'
import LogIn from './views/Login'
import SignUp from './views/Signup'
import Home from './views/Home'
import Navbar from './Components/Navbar'
import Modal2  from './Components/Modal2'

function App() {
  return (

    <div className="App h-screen flex flex-col bg-gray-200 overflow-x-hidden">
      <Navbar/>
      <Home/>
    </div>

  )
}

export default App
