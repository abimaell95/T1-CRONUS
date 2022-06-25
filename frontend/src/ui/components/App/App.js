import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import{
  Home,
  Tasks,
  Calendar,
  Login
} from '../../pages'

function App() {
  const [state, setState] = useState({
    user: {}
  })

  function setUser(user){
    setState({
      ...state,
      user: user
    })
  }


  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login  setUser={setUser}/>}>
        </Route>  
        <Route path="tasks" element={<Tasks />}>
        </Route>
        <Route path="calendar" element={<Calendar />}>
        </Route>
      </Routes>
  </BrowserRouter>)
}

export default App;