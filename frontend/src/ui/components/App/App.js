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
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>  
        <Route path="tasks" element={<Tasks />}>
        </Route>
        <Route path="calendar" element={<Calendar />}>
        </Route>
      </Routes>
  </BrowserRouter>)
}

export default App;