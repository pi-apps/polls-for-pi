import { Button, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import './MainHeader.css';

import {
  HomeOutlined
} from '@ant-design/icons';
import HeaderProps from '../../types/HeaderProps';

const {
  Header,
} = Layout;


export default function MainHeader(props: HeaderProps) {
  const navigate = useNavigate()

  const toRoot = () => {
    navigate('/', { state: { message: '成功', type: 'success' } })
  }

  // TODO: const pathname = this.props.location.pathname;
  let pathname = "";

  const leftMenuIems: MenuProps['items'] = [
    {
      key: '1',
      icon: ((pathname !== "/") &&
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00b96b',
            },
          }}
        >
          <Button
            type="default"
            size="large"
            onClick={toRoot}
          >
            <HomeOutlined />
          </Button>
        </ConfigProvider>
      ),
    },
  ];

  const rightMenuIems: MenuProps['items'] = [
    {
      key: '1',
      icon: (
        props.user === null ? (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00b96b',
              },
            }}
          >
            <Button
              type="default"
              size="large"
              onClick={props.onSignIn}
            >
              Sign in
            </Button>
          </ConfigProvider>
        ) : (
          <div>
            @{props.user.username} <button type="button" onClick={props.onSignOut}>Sign out</button>
          </div>
        )
      ),
    },
  ]

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Menu
        selectable={false}
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '20px' }}
        items={leftMenuIems}
      />

      <Menu
        selectable={false}
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '20px' }}
        items={rightMenuIems}
      />
    </Header>
  );
}
