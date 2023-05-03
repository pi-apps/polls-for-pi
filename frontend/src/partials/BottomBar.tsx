import { ErrorBlock, List, Popup, SwipeAction, TabBar, Tabs, Toast } from 'antd-mobile';
import {
  AppOutline, EditSOutline, EyeOutline, LinkOutline, UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import { FC, useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import HOCProps from '../types/HOCProps';
import { Poll } from '../types/Poll';
import TabProps from '../types/TabProps';
import ListItemPollForm from './ListItemPollForm';

import pollsAPI from '../apis/pollsAPI';
import './BottomBar.css';
import ListItemLinksForm from './ListItemLinksForm';
import { MyPolls } from './polls_tab/MyPolls';

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

const BottomBar = (props: HOCProps) => {
  const getPathname = () => {
    const location = useLocation();
    return location.pathname;
  }



  const pathname = getPathname();
  return (
    <>
      <div className={"body"}>
        {pathname === '/dashboard/home' &&
          <Home />
        }
        {pathname === '/dashboard/polls' &&
          <PollsTab {...props} />
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

export const PollsTab = (props: HOCProps) => {
  return (
    <>
      <Tabs className='w-full'>
        <Tabs.Tab title='My Polls' key='mypolls'>
          <MyPolls {...props} />
        </Tabs.Tab>
        <Tabs.Tab title='My Responses' key='myresponses'>
          西红柿
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export const PersonalCenter = () => {
  return <div>Me</div>
}

export default BottomBar;