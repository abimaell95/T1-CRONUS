import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import{
  Home,
  Tasks,
  Calendar
} from '../../pages'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="tasks" element={<Tasks />}>
        </Route>
        <Route path="calendar" element={<Calendar />}>
        </Route>
      </Routes>
  </BrowserRouter>)
}

export default App;