import {
  Button, Form, List, Space
} from 'antd-mobile';
import { UndoOutline } from 'antd-mobile-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';
import HOCProps from '../types/HOCProps';
import PaymentDTO from '../types/PaymentDTO';

type MyPaymentMetadata = {};


import './PollStarter.css';

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
console.log('_window.__ENV', _window.__ENV)
console.log('backendURL', backendURL)

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });
const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};

const PaymentForm = (props: HOCProps) => {
  const navigate = useNavigate()
  const [ priceItems, setPriceItems ] = useState<any>([]);
  const [ grandTotal, setGrandTotal ] = useState<number>(0.0);

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  const getPrice = async (product?: string) => {
    console.log("get poll options ai API", product);
    const options = await axiosClient.get(`/v1/pricings?product=${product}`);
    return options.data.data[0];
  }

  const calculateTotal = async () => {
    let total = 0.0;

    priceItems.forEach((item: any) => {
      const name = item.name.toLowerCase();
      if (name === "per option") {
        total += (item.price * props.poll.optionCount);
      } else if (name === "per response") {
        total += (item.price * props.poll.responseLimit);
      } else if (name === "per hour") {
        total += (item.price * (props.poll.durationDays * 24));
      }
    })

    total += (props.poll.responseLimit * props.poll.perResponseReward);

    setGrandTotal(total);
    console.log('total', total)
  }

  const orderPoll = async () => {
    if(props.user === null) {
      return props.setShowModal(true);
    }

    //const paymentData = { amount, memo, metadata: props.poll };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };
    //const payment = await window.Pi.createPayment(paymentData, callbacks);
    //console.log(payment);
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

  useEffect(() => {
    getPrice('poll').then(resp => {
      console.log('resp', resp);
      setPriceItems(resp.priceItems);
    })
  }, []);

  useEffect(() => {
    calculateTotal();
  });

  console.log('props.poll', props.poll)

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            {props.poll.title ?
              <>
                <Form
                  layout='horizontal'
                  footer={
                    <>
                      {/* <div
                        style={{
                          marginBottom: '24px',
                          fontSize: '15px',
                          color: 'var(--adm-color-weak)',
                        }}
                      >
                        Proceed to payment page.
                      </div> */}
                      <Button block type='submit' color='primary' size='large'>
                        Order
                      </Button>
                    </>
                  }
                  onFinish={orderPoll}
                >
                  <Form.Header>
                    <Space block justify="between">
                      <span>
                        Here are the options generated.
                      </span>
                      <Button
                        onClick={calculateTotal}
                        color='success' size='large'
                      >
                        <UndoOutline />
                      </Button>
                    </Space>
                  </Form.Header>
                  <List>
                    {priceItems.map((item: any) =>
                      <Form.Item
                        name={item.name}
                        initialValue={item.price}
                        key={item.name}
                        label={`${item.name} Fee : ${item.price} π`}
                      >
                        {item.name.toLowerCase() === "per option" &&
                          <span>{(item.price * props.poll.optionCount).toFixed(4)} π for {props.poll.optionCount} options</span>
                        }
                        {item.name.toLowerCase() === "per response" &&
                          <span>{(item.price * props.poll.responseLimit).toFixed(4)} π for {props.poll.responseLimit} response limit</span>
                        }
                        {item.name.toLowerCase() === "per hour" &&
                          <span>{(item.price * (props.poll.durationDays * 24)).toFixed(4) } π for {props.poll.durationDays} days ({props.poll.durationDays * 24} hours)</span>
                        }
                      </Form.Item>
                    )}
                    <Form.Item
                      name="Total Reward for Responses"
                      initialValue={props.poll.perResponseReward * props.poll.responseLimit}
                      label={
                        <>
                          <div>Total Reward for Responses</div>
                          <div>
                            ({props.poll.perResponseReward + ' π x ' + props.poll.responseLimit + ' max responses'})
                          </div>
                        </>
                      }
                    >
                      <span>{props.poll.responseLimit * props.poll.perResponseReward} π for {props.poll.responseLimit} responses</span>
                    </Form.Item>
                    <Form.Item
                      name="Grand Total"
                      initialValue={props.poll.perResponseReward * props.poll.responseLimit}
                      label="Grand Total:"
                    >
                      <span>{grandTotal.toFixed(4)} π</span>
                    </Form.Item>
                  </List>
                </Form>
              </>
              :
              <>
                <Button
                  block
                  color='primary' size='large'
                  className='mb-4'
                  onClick={toRoot}
                  >
                  Home
                </Button>
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentForm;