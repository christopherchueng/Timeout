import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { authenticate } from './store/session';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';
import AlarmList from './components/AlarmList';
import CreateAlarm from './components/Alarm/CreateAlarm';
import EditAlarm from './components/Alarm/EditAlarm'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state?.session?.user)


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {currentUser ? <NavBar /> : ""}
      <Switch>
        <Route exact path='/'>
          <SplashPage />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/register'>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/dashboard'>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute exact path='/create'>
          <CreateAlarm />
        </ProtectedRoute>
        <ProtectedRoute exact path='/edit'>
          <EditAlarm />
        </ProtectedRoute>
        <ProtectedRoute path='/:id'>
          <AlarmList />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
