import { ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Col, Layout, Row } from 'antd';

import { NavLink } from 'react-router-dom';


import MainHeader from '../../components/MainHeader';

import SignIn from '../../components/SignIn';
import HeaderProps from '../../types/HeaderProps';
import './Home.css';

const {
  Content,
} = Layout;

const Home = (props: HeaderProps) => {

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <MainHeader user={props.user} onSignIn={props.onSignIn} onSignOut={props.onSignOut} />
          <Content style={{ padding: '0 50px', marginTop: 75 }}>
            <Row justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <span>Welcome to Polls for Pi. What poll do you have in mind?</span>
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <div style={{ padding: 24, background: '#fff', minHeight: 320 }}>
                  <div className="wrap">
                    <div className="extraContent">+
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
