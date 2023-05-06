import React from 'react';
import './app.scss';
import { HashRouter, Switch } from 'react-router-dom'
import Register from '../../pages/register';
import Login from '../../pages/login';
import Profile from '../../pages/profile';
import { ProtectedRoute } from '../protected-route';

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <ProtectedRoute onlyForAuth={true} path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path="/register" exact={true}>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path="/login" exact={true}>
            <Login />
          </ProtectedRoute>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
