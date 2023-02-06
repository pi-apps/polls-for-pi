import axios from 'axios';
import 'normalize.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentDTO from './types/PaymentDTO';

import './defaults.css';

import { Browse, Home, Shop } from './pages';

import Notfound from './notfound';

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

const routing = (
  <Router>
    <Routes>
      <Route path="/" element={<Home signIn={signIn} signOut={signOut} />} />
      <Route path="/products" element={<Browse />} />
      <Route path="/shop" element={<Shop />} />
      <Route element={Notfound} />
    </Routes>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));