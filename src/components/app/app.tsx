import React from 'react';
import './app.scss';
import { Switch, useLocation } from 'react-router-dom'
import Register from '../../pages/register';
import Login from '../../pages/login';
import Profile from '../../pages/profile';
import { ProtectedRoute } from '../protected-route';
import Header from '../header/header';
import Friends from '../../pages/friends';
import People from '../../pages/people';
import OtherProfile from '../../pages/other-profile';
import Timeline from '../../pages/timeline';

function App() {
  const location = useLocation();
  return (
    <>
      {/* <HashRouter> */}
        {/* {location.pathname === '/register' && location.pathname === '/login' && <Header />} */}
        {
          location.pathname === '/register' || location.pathname === '/login' ?
          null :
          <Header />
        }
        <Switch>
          <ProtectedRoute onlyForAuth={true} path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={true} path="/:id/profile" exact={true}>
            <OtherProfile />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={true} path="/friends" exact={true}>
            <Friends />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={true} path="/people" exact={true}>
            <People />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={true} path="/" exact={true}>
            <Timeline />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path="/register" exact={true}>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute onlyForAuth={false} path="/login" exact={true}>
            <Login />
          </ProtectedRoute>
        </Switch>
      {/* </HashRouter> */}
    </>
  );
}

export default App;
