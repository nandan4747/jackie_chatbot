import Navbar from './NavBarComp/Navbar'
import './App.css'
import Home from './Home/Home'
import Mymessage from './chat_comp/Mymessage'
import Response from './chat_comp/Response'
import Login from './Logoin_comp/Login'
import Register from './Logoin_comp/Register'
import {Routes, Route} from 'react-router-dom'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>

    </Routes>
    
    </>
  )
}

export default App
