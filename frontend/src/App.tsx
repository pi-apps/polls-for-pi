import { useState } from 'react';
import {
  Route, Routes, useLocation
} from 'react-router-dom';

import './css/style.css';

import axios from 'axios';
import Notfound from './notfound';
import { Browse, Home } from './pages';
import HomeV2 from './pages/HomeV2';
import PaymentDTO from './types/PaymentDTO';

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];

// Make TS accept the existence of our window.__ENV object - defined in index.html:
interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const signIn = async () => {
    const scopes = ['username', 'payments'];
    const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    signInUser(authResult);
    setUser(authResult.user);
  }

  const signOut = () => {
    setUser(null);
    signOutUser();
  }

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post('/user/signin', { authResult });
    return setShowModal(false);
  }

  const signOutUser = () => {
    return axiosClient.get('/user/signout');
  }

  const onModalClose = () => {
    setShowModal(false);
  }

  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', { payment });
  }

  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<HomeV2  />} />
      <Route path="/get_started" element={<Home onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose} />} />
      <Route path="/demo" element={<Home onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose} />} />
      <Route path="/pricing" element={<Browse onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose} />} />
      <Route element={Notfound} />
    </Routes>
  );
}

export default App;
