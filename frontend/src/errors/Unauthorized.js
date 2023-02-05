import { Col, Row } from 'antd';

import './Error.css';

const Unauthorized = () => {
  return (
    <div className="wrap">
      <div className="extraContent">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={24} lg={12}>
            <div>Unauthorized Page</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Unauthorized;
