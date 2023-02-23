import {
  Button, Form, Input, List, Space
} from 'antd-mobile';
import { UndoOutline } from 'antd-mobile-icons';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WindowWithEnv from '../interfaces/WindowWithEnv';
import HOCProps from '../types/HOCProps';

import './PollStarter.css';

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
console.log('_window.__ENV', _window.__ENV)
console.log('backendURL', backendURL)

const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

const OptionsGeneratorForm = (props: HOCProps) => {
  const navigate = useNavigate()
  const [options, setOptions] = useState<string[]>(props.poll.options || []);

  const toRoot = () => {
    navigate('/', { state: { message: 'Home', type: 'success' } })
  }

  const getPollOptions = async (prompt?: string) => {
    console.log("get poll options ai API", prompt);
    const options = await axiosClient.post('/v1/polls_ai', { prompt, maxOptions: props.poll.optionCount });
    return options.data.data;
  }

  const generateOptions = async () => {
    const options = await getPollOptions(props.poll.title)
    console.log('options', options)
    setOptions(options)
  }

  const proceedToPayment = async (values: any) => {
    console.log('values', values)
    navigate('/payment', { state: { message: 'Home', type: 'success' } })
  }

  console.log('props.poll', props.poll);
  console.log('options', options);

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
                  layout='vertical'
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
                      <Space block justify="between">
                        <Button
                          fill='outline'
                          className='p-4'
                          size='large'
                          onClick={() => navigate('/poll_config', { state: { message: 'Home', type: 'success' } })}
                        >
                          Back
                        </Button>
                        <Button type='submit' color='primary' size='large'>
                          Proceed to Payment
                        </Button>
                      </Space>
                    </>
                  }
                  onFinish={proceedToPayment}
                >
                  <Form.Header>
                    <Space block justify="between">
                      <span>
                        Here are the options generated.
                      </span>
                      <Button
                        onClick={generateOptions}
                        color='success' size='large'
                      >
                        <UndoOutline />
                      </Button>
                    </Space>
                  </Form.Header>
                  <List>
                    {options.map((item, index) =>
                      <Form.Item
                        name={item}
                        key={item}
                        initialValue={item}
                        label={index === 0 ? props.poll.title : null}
                      >
                        <Input onChange={console.log} placeholder={item} />
                      </Form.Item>
                    )}
                  </List>
                </Form>
              </>
              :
              <Button
                block
                color='primary' size='large'
                className='mb-4'
                onClick={toRoot}
                >
                Home
              </Button>
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default OptionsGeneratorForm;