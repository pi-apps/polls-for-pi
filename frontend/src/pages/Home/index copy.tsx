import { ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';

import './Home.css';

export default function Home() {
  return (
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
  )
}
