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
import { UserContextProvider } from '../Context/AuthContext';
import { LayoutApp } from '../Layouts/layout';

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
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
            <Route path="*" element={<Login setUser={() => setUser()} />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
