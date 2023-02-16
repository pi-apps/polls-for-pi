import { useEffect, useState } from 'react';
import {
  Route, Routes, useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import axios from 'axios';
import Notfound from './notfound';
import { Browse, Home, Shop } from './pages';
import GetStarted from './pages/GetStarted';
import HomeV2 from './pages/HomeV2';
import PollWizard from './pages/PollWizard';
import PaymentDTO from './types/PaymentDTO';
import { AuthResult, User } from './types/UserType';

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

const getPathname = () => {
  const location = useLocation();
  return location.pathname;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [mode, setMode] = useState<string>('light');

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

  const onSetTitle = (title: string) => {
    console.log('title', title)
    setTitle(title);
  }

  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', { payment });
  }

  const onChangeMode = (mode: string) => {
    console.log('mode', mode);
    setMode(mode);
    localStorage.theme = mode;
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    document.documentElement.setAttribute(
      'data-prefers-color-scheme',
      mode === 'dark' ? 'dark' : 'light'
    )
  }

  const location = useLocation();
  const pathname = getPathname();
  console.log('pathname', pathname)

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  document.documentElement.setAttribute(
    'data-prefers-color-scheme',
    mode === 'dark' ? 'dark' : 'light'
  )

  // useEffect(() => {
  //   console.log('localStorage.theme', localStorage.theme);
  //   // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  //   if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [mode]); // triggered on mode change

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeV2 pathname={pathname} setMode={onChangeMode} mode={mode} />
        }
      />
      <Route
        path="/get_started"
        element={
          <GetStarted title={title} setTitle={onSetTitle} pathname={pathname} setMode={onChangeMode} mode={mode}  />
        }
      />
      <Route
        path="/demo"
        element={
          <Home
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
          />
        }
      />
      <Route
        path="/pricing"
        element={
          <Browse
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
          />
        }
      />
      <Route
        path="/shop"
        element={
          <Shop
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
          />
        }
      />
      <Route
        path="/wizard"
        element={
          <PollWizard
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
          />
        }
      />
      <Route element={Notfound} />
    </Routes>
  );
}

export default App;
