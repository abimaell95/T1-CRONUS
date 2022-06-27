import { React, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Tasks,
  Calendar,
  Login,
} from '../../pages';

function App() {
  const [state, setState] = useState({
    user: {},
  });

  function setUser(user) {
    setState({
      ...state,
      user,
    });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={() => setUser()} />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
