import { TabBar } from 'antd-mobile';
import {
  AppOutline, UnorderedListOutline,
  UserOutline
} from 'antd-mobile-icons';
import { FC } from 'react';
import {
  Route,
  Routes, useLocation, useNavigate
} from 'react-router-dom';

import Header from '../../partials/Header';
import HOCProps from '../../types/HOCProps';

import './demo2.css';

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
  return (
    <>
      {/*  Site header */}
      <div className={"app"}>
        <div className={"top"}>
          <Header {...props} />
      </div>
        <div className={"body"}>
          <Routes>
            <Route path='/dashboard/home' element={<Home />} />
            <Route path='/dashboard/todo' element={<Todo />} />
            <Route path='/dashboard/me' element={<PersonalCenter />} />
          </Routes>
        </div>
        <div className={"bottom"}>
          <Bottom />
        </div>
      </div>
    </>
  );
}


function Home() {
  return <div>首页</div>
}

function Todo() {
  return <div>待办</div>
}

function Message() {
  return <div>消息</div>
}

function PersonalCenter() {
  return <div>我的</div>
}
export default Dashboard;