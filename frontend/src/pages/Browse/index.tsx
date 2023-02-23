import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import MainHeader from '../../components/MainHeader';
import SignIn from '../../components/SignIn';
import WindowWithEnv from '../../interfaces/WindowWithEnv';
import HOCProps from '../../types/HOCProps';
import ProductCard from './components/ProductCard';

type MyPaymentMetadata = {};

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];

interface PaymentDTO {
  amount: number,
  user_uid: string,
  created_at: string,
  identifier: string,
  metadata: Object,
  memo: string,
  status: {
    developer_approved: boolean,
    transaction_verified: boolean,
    developer_completed: boolean,
    cancelled: boolean,
    user_cancelled: boolean,
  },
  to_address: string,
  transaction: null | {
    txid: string,
    verified: boolean,
    _link: string,
  },
};

// Make TS accept the existence of our window.__ENV object - defined in index.html:
const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});
const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};


export default function Browse(props: HOCProps) {
  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(props.user === null) {
      return props.setShowModal(true);
    }
    const paymentData = { amount, memo, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };
    const payment = await window.Pi.createPayment(paymentData, callbacks);
    console.log(payment);
  }

  const onReadyForServerApproval = (paymentId: string) => {
    console.log("onReadyForServerApproval", paymentId);
    axiosClient.post('/payments/approve', {paymentId}, config);
  }

  const onReadyForServerCompletion = (paymentId: string, txid: string) => {
    console.log("onReadyForServerCompletion", paymentId, txid);
    axiosClient.post('/payments/complete', {paymentId, txid}, config);
  }

  const onCancel = (paymentId: string) => {
    console.log("onCancel", paymentId);
    return axiosClient.post('/payments/cancelled_payment', {paymentId});
  }

  const onError = (error: Error, payment?: PaymentDTO) => {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
      // handle the error accordingly
    }
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <MainHeader {...props} />
          <Content style={{ padding: '0 50px', marginTop: 75 }}>
            <Row justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <div style={{ padding: 24, background: '#fff', minHeight: 320 }}>
                  <div className="wrap">
                    <div className="extraContent">
                      <Row gutter={16} style={{ margin: "10px" }}>
                        <Col xs={24} sm={24} md={24} lg={8}>
                          <ProductCard
                            name="Apple Pie"
                            description="You know what this is. Pie. Apples. Apple pie."
                            price={3}
                            pictureURL="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Apple_pie.jpg/1280px-Apple_pie.jpg"
                            pictureCaption="Picture by Dan Parsons - https://www.flickr.com/photos/dan90266/42759561/, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=323125"
                            onClickBuy={() => orderProduct("Order Apple Pie", 3, { productId: 'apple_pie_1' })}
                          />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8}>
                          <ProductCard
                            name="Lemon Meringue Pie"
                            description="Non-contractual picture. We might have used oranges because we had no lemons. Order at your own risk."
                            price={5}
                            pictureURL="https://live.staticflickr.com/1156/5134246283_f2686ff8a8_b.jpg"
                            pictureCaption="Picture by Sistak - https://www.flickr.com/photos/94801434@N00/5134246283, CC BY-SA 2.0"
                            onClickBuy={() => orderProduct("Order Lemon Meringue Pie", 5, { productId: 'lemon_pie_1' })}
                          />
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

      {props.showModal && <SignIn onSignIn={props.onSignIn} onModalClose={props.onModalClose} />}
    </>


  );
}
