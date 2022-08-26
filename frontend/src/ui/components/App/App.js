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
  Reports,
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
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<Login setUser={() => setUser()} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
