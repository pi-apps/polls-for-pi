import { TabBar } from 'antd-mobile';
import {
  AppOutline, UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../partials/Header';
import HOCProps from '../types/HOCProps';

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

const Dashboard = (props: HOCProps) => {
  const pathname = getPathname();

  return (
    <>
      {/*  Site header */}
      <div className={"app"}>
        <div className={"top"}>
          <Header {...props} />
      </div>
        <div className={"body"}>
          {pathname === '/dashboard/home' &&
            <Home />
          }
          {pathname === '/dashboard/polls' &&
            <Todo />
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


function Home() {
  return <div>Home</div>
}

function Todo() {
  return <div>Polls</div>
}

function PersonalCenter() {
  return <div>Me</div>
}
export default Dashboard;