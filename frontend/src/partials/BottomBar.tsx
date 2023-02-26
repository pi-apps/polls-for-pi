import { List, Popup, TabBar } from 'antd-mobile';
import {
  AppOutline, UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';
import HOCProps from '../types/HOCProps';
import { Poll } from '../types/Poll';
import TabProps from '../types/TabProps';
import ListItemPollForm from './ListItemPollForm';

const Bottom: FC = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs = [
    {
      key: '/',
      title: 'Home',
      icon: <AppOutline />,
    },
    {
      key: '/dashboard/polls',
      title: 'Polls',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/dashboard/me',
      title: 'Profile',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
console.log('_window.__ENV', _window.__ENV)
console.log('backendURL', backendURL)

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const BottomBar = (props: HOCProps) => {
  const getPathname = () => {
    const location = useLocation();
    return location.pathname;
  }

  const [userPolls, setPolls] = useState<Poll[]>([]);

  const getUserPolls = async (username?: string) => {
    console.log("get user polls ", username);
    const options = await axiosClient.get(`/v1/polls?username=${username}`);
    return options.data;
  }

  useEffect(() => {
    getUserPolls(props.user?.username || 'eastmael').then(resp => {
      console.log('polls data', resp.data)
      setPolls(resp.data);
    })
  }, []);

  console.log('userPolls', userPolls);

  const pathname = getPathname();
  return (
    <>
      <div className={"body"}>
        {pathname === '/dashboard/home' &&
          <Home />
        }
        {pathname === '/dashboard/polls' &&
          <PollsTab polls={userPolls} />
        }
        {pathname === '/dashboard/me' &&
          <PersonalCenter />
        }
      </div>
      <div className={"bottom"}>
        <Bottom />
      </div>
    </>
  )
}

export const Home = () => {
  return (
    <>
      <span>Home</span>
    </>
  )
}

export const PollsTab = (props: TabProps) => {
  function handleClick() {
    // ...
  }

  const [displayPopup, setDisplayPopup] = useState(false);

  return (
    <>
      <List header='Polls'>
        {props.polls.map((item, index) =>
          <>
            <List.Item
              key={index}
              extra={`${item.responses.length} responses`}
              onClick={() => {
                setDisplayPopup(true);
              }}
            >
              {item.title}
            </List.Item>
            <Popup
              key={`popup-${index}`}
              position='right'
              visible={displayPopup}
              showCloseButton
              onClose={() => {
                setDisplayPopup(false)
              }}
            >
              <div
                style={{ height: '98vh', overflowY: 'scroll', padding: '20px' }}
                key={`div-${index}`}
              >
                <ListItemPollForm poll={item} setDisplayPopup={setDisplayPopup} />
              </div>
            </Popup>
          </>
        )}
      </List>
    </>
  )
}

export const PersonalCenter = () => {
  return <div>Me</div>
}

export default BottomBar;