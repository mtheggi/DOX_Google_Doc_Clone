import './index.css'
import FloatingInput from './Components/authentication/FloatingInput'
import LogIn from './views/Login'
import SignUp from './views/Signup'
import Home from './views/Home'
import Navbar from './Components/Navbar'

function App() {
  return (

    <div className="App h-screen flex flex-col bg-white overflow-x-hidden">
       <Navbar/>
       <Home/>
    </div>

  )
}

export default App
