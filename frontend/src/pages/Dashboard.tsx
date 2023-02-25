import { List, TabBar } from 'antd-mobile';
import {
  AppOutline, UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';

import Header from '../partials/Header';
import HOCProps from '../types/HOCProps';
import { Poll } from '../types/Poll';

import './demo2.css';

const getPathname = () => {
  const location = useLocation();
  return location.pathname;
}

const Bottom: FC = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs = [
    {
      key: '/dashboard/home',
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
const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};


const Dashboard = (props: HOCProps) => {
  const pathname = getPathname();
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
  console.log('pathname', pathname);

  return (
    <>
      {/*  Site header */}
      <div className={"app"}>
        <div className={"top"}>
          <Header {...props} />
      </div>
        <div className={"body"}>
          {pathname === '/dashboard/home' &&
            <Home polls={userPolls} />
          }
          {pathname === '/dashboard/polls' &&
            <Todo polls={userPolls} />
          }
          {pathname === '/dashboard/me' &&
            <PersonalCenter />
          }
        </div>
        <div className={"bottom"}>
          <Bottom />
        </div>
      </div>
    </>
  );
}

interface TabProps {
  polls: Poll[]
}

const Home = (props: TabProps) => {
  function handleClick() {
    // ...
  }

  return (
    <>
      <List header='Polls'>
        {props.polls.map((item, index) =>
          <List.Item
            key={index}
            extra={`${item.responses.length} responses`}
            onClick={handleClick}
          >
            {item.title}
          </List.Item>
        )}
      </List>
    </>
  )
}

const Todo = (props: TabProps) => {
  function handleClick() {
    // ...
  }

  return (
    <>
      <List header='Polls'>
        {props.polls.map((item, index) =>
          <List.Item
            key={index}
            extra={`${item.responses.length} responses`}
            onClick={handleClick}
          >
            {item.title}
          </List.Item>
        )}
      </List>
    </>
  )
}

function PersonalCenter() {
  return <div>Me</div>
}
export default Dashboard;