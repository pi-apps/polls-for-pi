import { List, Popup, SwipeAction, TabBar, Toast } from 'antd-mobile';
import {
  AppOutline, EditSOutline, EyeOutline, LinkOutline, UnorderedListOutline,
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

import './BottomBar.css';
import ListItemLinksForm from './ListItemLinksForm';

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
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showLinksPopup, setShowLinksPopup] = useState(false);
  const [itemPoll, setItemPoll] = useState<Poll>({
    title: '',
    optionCount: 2,
    distribution: '',
    isLimitResponse: true,
    responseLimit: 100,
    durationDays: 30,
    perResponseReward: 0,
    responses: [],
  });

  return (
    <>
      {/* <Collapse accordion style={{width: '100%'}}>
        {props.polls.map((item, index) =>
          <Collapse.Panel
            key={item.title} title={item.title}
            style={{
              justifyContent: 'flex-end'
            }}
          >
            <Space justify='end'>
              <Button color='primary' fill='solid'>
                <EditSOutline />
              </Button>
              <Button color='primary' fill='solid'>
                <EyeOutline />
              </Button>
            </Space>
          </Collapse.Panel>
        )}
      </Collapse> */}

      <List header='Polls'>
        {props.polls.map((item, index) =>
          <SwipeAction
            key={index}
            closeOnAction={false}
            rightActions={[
              {
                key: 'edit',
                text: <EditSOutline />,
                color: 'primary',
                onClick: (e) => {
                  setShowEditPopup(true);
                  setItemPoll(item);
                }
              },
              {
                key: 'show',
                text: <EyeOutline />,
                color: 'success',
                onClick: (e) => {
                  setShowLinksPopup(true);
                  setItemPoll(item);
                }
              },
              {
                key: 'copy-lin',
                text: <LinkOutline />,
                color: 'light',
                onClick: (e) => {
                  navigator.clipboard.writeText(item.responseUrl || '');
                  Toast.show({
                    content: 'Response URL copied to clipboard.',
                  })
                }
              }
            ]}
          >
            <List.Item
              key={index}
              extra={`${item.responses.length} responses`}
              // clickable
              // onClick={() => {
              //   setShowEditPopup(true);
              //   setItemPoll(item);
              // }}
            >
              <span key={`span-${index}`}>{item.title}</span>
            </List.Item>
          </SwipeAction>
        )}
      </List>
      <Popup
        position='right'
        visible={showEditPopup}
        showCloseButton
        onClose={() => {
          setShowEditPopup(false)
        }}
        destroyOnClose={true}
        bodyStyle={{ width: '100vw' }}
      >
        <div
          style={{ height: '98vh', overflowY: 'scroll' }}
        >
          <ListItemPollForm
            poll={itemPoll} setDisplayPopup={setShowEditPopup}
          />
        </div>
      </Popup>
      <Popup
        position='right'
        visible={showLinksPopup}
        showCloseButton
        onClose={() => {
          setShowLinksPopup(false)
        }}
        destroyOnClose={true}
        bodyStyle={{ width: '100vw' }}
      >
        <div
          style={{
            height: '98vh', overflowY: 'scroll',
          }}
        >
          <ListItemLinksForm
            poll={itemPoll} setDisplayPopup={setShowLinksPopup}
          />
        </div>
      </Popup>
    </>
  )
}

export const PersonalCenter = () => {
  return <div>Me</div>
}

export default BottomBar;