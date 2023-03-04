import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { MenuProps, MenuTheme } from 'antd';
import { Button } from 'antd-mobile';
import PollResponseProps from '../types/PollResponseProps';

const items: MenuProps['items'] = [
  {
    label:
    <span className="py-1 px-2 flex items-center cursor-pointer">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" className="stroke-slate-400 dark:stroke-slate-500"/>
        <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
          className="stroke-slate-400 dark:stroke-slate-500"/>
      </svg>Light
    </span>,
    key: 'light',
  },
  {
    label:
    <span className="py-1 px-2 flex items-center cursor-pointer">
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mr-2">
        <path fillRule="evenodd" clipRule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
          className="fill-transparent"/>
        <path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
          className="fill-slate-400 dark:fill-slate-500"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
          className="fill-slate-400 dark:fill-slate-500"/>
      </svg>Dark
    </span>
    ,
    key: 'dark',
  },
  // {
  //   label:
  //   <span className="py-1 px-2 flex items-center cursor-pointer">
  //     <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 mr-2">
  //       <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" strokeWidth="2" strokeLinejoin="round" className="stroke-sky-500 fill-sky-400/20"/>
  //       <path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-sky-500"/>
  //     </svg>System
  //   </span>,
  //   key: 'system',
  // },
];

const onClick: MenuProps['onClick'] = (e) => {
  console.log('e', e)
}

const PollResponseHeader = (props: PollResponseProps)  => {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  const pathname = props.pathname;
  console.log('pathname', pathname)
  console.log('theme', theme)
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8 fill-current text-purple-600" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 16c0 8.836 -7.164 16 -16 16S0 24.836 0 16h4c0 6.617 5.383 12 12 12s12 -5.383 12 -12S22.617 4 16 4V0c8.836 0 16 7.164 16 16zM16 6c-5.523 0 -10 4.477 -10 10s4.477 10 10 10c5.521 0 10 -4.477 10 -10H16V6z"/>
              </svg>
            </Link>
          </div>

          {/* Desktop navigation */}

            <nav className="hidden md:flex md:grow">

              {/* Desktop menu links */}
              {pathname === "/" &&
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link to="/get_started" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                    Get Started
                  </Link>
                </li>
                {/* <li>
                  <Link to="/demo" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">Pricing</Link>
                </li> */}
              </ul>
              }

              {/* Desktop sign in links */}
              <ul
                className="flex grow justify-end flex-wrap items-center"
              >
                <li>
                  {/* <Link to="/signin" className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link> */}
                  {props.user ?
                    <span>@{props.user.username}</span>
                    :
                    <Button
                      size='mini'
                      color='primary' fill='none'
                      onClick={props.onSignIn}
                      style={{
                        paddingLeft: '0px'
                      }}
                      loading={props.signingIn}
                    >
                      Sign in
                    </Button>
                  }
                </li>
                {/* <li>
                  <Link to="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">Sign up</Link>
                </li> */}
              </ul>

            </nav>

          {/* Mobile menu */}
          <div className="md:hidden">

            {/* Hamburger button */}
            <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls="mobile-nav" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav id="mobile-nav" ref={mobileNav} className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" style={mobileNavOpen ? { maxHeight: mobileNav.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: .8 } }>
              <ul className="bg-gray-800 px-4 py-2">
                <li>
                  <Link to="/get_started" className="flex text-gray-300 hover:text-gray-200 py-2">Get Started</Link>
                </li>
                <li>
                  <Link to="/demo" className="flex text-gray-300 hover:text-gray-200 py-2">Demo</Link>
                </li>
                <li>
                  <Link to="/pricing" className="flex text-gray-300 hover:text-gray-200 py-2">Pricing</Link>
                </li>
                <li>
                  {props.user ?
                    <span>@{props.user.username}</span>
                    :
                    <Button
                      size='mini'
                      color='primary' fill='none'
                      onClick={props.onSignIn}
                      style={{
                        paddingLeft: '0px'
                      }}
                      loading={props.signingIn}
                    >
                      Sign in
                    </Button>
                  }
                </li>
              </ul>
            </nav>

          </div>

        </div>
      </div>
    </header>
  );
}

export default PollResponseHeader;
