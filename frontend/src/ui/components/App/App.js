import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import{
  Home,
  Tasks
} from '../../pages'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="tasks" element={<Tasks />}>
        </Route>
      </Routes>
  </BrowserRouter>)
}

export default App;