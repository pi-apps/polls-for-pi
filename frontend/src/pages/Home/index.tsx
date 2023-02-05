import { ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Row } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


import MainHeader from '../../components/MainHeader';

import SignIn from '../../components/SignIn';
import PaymentDTO from '../../types/PaymentDTO';
import './Home.css';

const {
  Content,
} = Layout;

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];

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

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <MainHeader user={user} onSignIn={signIn} onSignOut={signOut} />
          <Content style={{ padding: '0 50px', marginTop: 75 }}>
            <Row justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <div style={{ padding: 24, background: '#fff', minHeight: 320 }}>
                  <div className="wrap">
                    <div className="extraContent">
                      <Row gutter={16} style={{ margin: "10px" }}>
                        <Col xs={24} sm={24} md={24} lg={8}>
                          <Card style={{ display: "flex", justifyContent: "center" }}>
                            <NavLink to="/products">
                              <ShopOutlined style={{ fontSize: '4em', color: '#08c' }} />
                            </NavLink>
                          </Card>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8}>
                          <Card style={{ display: "flex", justifyContent: "center" }}>
                            <NavLink to="/shop">
                              <ShoppingCartOutlined style={{ fontSize: '4em', color: '#08c' }} />
                            </NavLink>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>

      {showModal && <SignIn onSignIn={signIn} onModalClose={onModalClose} />}
    </>
  );
}

export default Home;
