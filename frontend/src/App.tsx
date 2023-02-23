import { useEffect, useState } from 'react';
import {
  Route, Routes, useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import axios from 'axios';
import WindowWithEnv from './interfaces/WindowWithEnv';
import Notfound from './notfound';
import { Browse, Home, Shop } from './pages';
import GetStarted from './pages/GetStarted';
import HomeV2 from './pages/HomeV2';
import OptionsGenerator from './pages/OptionsGenerator';
import Payment from './pages/Payment';
import PollConfig from './pages/PollConfig';
import PollConfigDesktop from './pages/PollConfigDesktop';
import PollWizard from './pages/PollWizard';
import PriceCalculator from './pages/PriceCalculator';
import PaymentDTO from './types/PaymentDTO';
import { Poll } from './types/Poll';
import { AuthResult, User } from './types/UserType';

// Make TS accept the existence of our window.__ENV object - defined in index.html:
const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const getPathname = () => {
  const location = useLocation();
  return location.pathname;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('dark');
  const [poll, setPoll] = useState<Poll>({
    title: '',
    budget: 0,
    optionCount: 2,
    distribution: '',
    isLimitResponse: true,
    responseLimit: 100,
    durationDays: 30,
    perResponseReward: 0,
  });

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

    if (location.pathname === "/") {
      setPoll({
        title: '',
        budget: 0,
        optionCount: 2,
        distribution: '',
        isLimitResponse: true,
        responseLimit: 100,
        durationDays: 30,
        perResponseReward: 0,
      });
    }
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

  console.log('poll', poll)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeV2
            pathname={pathname} setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/get_started"
        element={
          <GetStarted
            pathname={pathname}
            showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/wizard"
        element={
          <PollWizard
            onSignIn={signIn} onSignOut={signOut} user={user}
            showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/poll_config"
        element={
          <PollConfig
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/options"
        element={
          <OptionsGenerator
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/payment"
        element={
          <Payment
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/price_calc"
        element={
          <PriceCalculator
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />

      <Route
        path="/poll_config_desktop"
        element={
          <PollConfigDesktop
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />


      <Route
        path="/demo"
        element={
          <Home
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/pricing"
        element={
          <Browse
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />
      <Route
        path="/shop"
        element={
          <Shop
            onSignIn={signIn} onSignOut={signOut} user={user} showModal={showModal} setShowModal={setShowModal} onModalClose={onModalClose}
            setMode={onChangeMode} mode={mode}
            setPoll={setPoll} poll={poll}
          />
        }
      />


      <Route element={Notfound} />
    </Routes>
  );
}

export default App;
